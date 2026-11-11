library(tidyverse)
library(fpp3)

# 1. Importation de notre fichier StatCan
barley_raw <- read_csv("Barley_Saskatchewan_Prices.csv")
# --- On vérifie les noms des colonnes
glimpse(barley_raw)

# 2. Nettoyage et mise au format tsibble
barley_clean <- barley_raw %>%
  select(
    REF_DATE,
    GEO,
    `Farm products`,
    UOM, # Unité de mesure
    VALUE # Le prix
  ) %>%
  filter(
    GEO == "Saskatchewan",
    str_detect(`Farm products`, "Barley")
  ) %>%
  mutate(
    date = yearmonth(REF_DATE)   # On converti en date mensuelle
  ) %>%
  as_tsibble(index = date)

glimpse(barley_clean)

autoplot(barley_clean, VALUE) +
  labs(
    title = "Prix mensuel de l’orge en Saskatchewan",
    x = "Mois",
    y = "Prix (dollars par tonne)"
  )

# 3. Ajustement du modèle ARIMA

fit_arima <- barley_clean %>%
  model(ARIMA = ARIMA(VALUE))
report(fit_arima)
gg_tsresiduals(fit_arima)
fc_arima <- fit_arima %>%
  forecast(h = 36)

autoplot(fc_arima, barley_clean) + 
  labs(
    title = "Prévisions ARIMA — Orge Saskatchewan",
    y = "Prix (dollars par tonne)",
    x = "Mois"
  )

# 4. Ajustement du modèle ETS

fit_ets <- barley_clean %>%
  model(
    ETS = ETS(VALUE)
  )
report(fit_ets)
gg_tsresiduals(fit_ets)
fc_ets <- fit_ets %>%
  forecast(h = 36)
fc_ets %>%
  autoplot(barley_clean) +
  labs(
    title = "Prévisions ETS — Orge Saskatchewan",
    x = "Mois",
    y = "Prix (dollars par tonne)"
  )

# 5. Voir quel modèle est le meilleur 

# --- Critères d'information (AIC, AICc, BIC)
stats_arima <- glance(fit_arima) %>%
  mutate(Model = "ARIMA")

stats_ets <- glance(fit_ets) %>%
  mutate(Model = "ETS")

stats_compare <- bind_rows(stats_arima, stats_ets) %>%
  select(Model, AIC, AICc, BIC)

# --- Mesures d'exactitude (RMSE, MAE, MAPE)
acc_arima <- accuracy(fit_arima) %>%
  filter(.type == "Training") %>% # on garde les mesures sur l'ensemble d'entraînement
  mutate(Model = "ARIMA")

acc_ets <- accuracy(fit_ets) %>%
  filter(.type == "Training") %>%
  mutate(Model = "ETS")

acc_compare <- bind_rows(acc_arima, acc_ets) %>%
  select(Model, RMSE, MAE, MAPE)

# ---Tableau final qui combine stats + accuracy
model_compare <- stats_compare %>%
  left_join(acc_compare, by = "Model")
model_compare
