const github = 'https://github.com/hilarie-benita/';
const projects = [
 {title:'Marketplace Intelligence & AI Platform',area:'Data engineering',tone:'lime',visual:'pipeline',status:'Ongoing',summary:'A validated analytics pipeline and Power BI reporting layer for a Brazilian e-commerce marketplace.',question:'How can marketplace teams turn nine source files into consistent metrics for operational and commercial reporting?',work:['Built a Bronze, Silver and Gold pipeline in PySpark from nine Olist CSVs.','Modeled four Gold dimensions and four fact tables, then ran 33 validation checks and reconciled financial totals.','Built Power BI reporting. Machine learning and AI development are ongoing.'],tools:['Python','PySpark','SQL','Power BI'],repo:'marketplace-intelligence-platform'},
 {title:'Hospital Patient Flow Analytics',area:'Healthcare',tone:'mint',visual:'flow',summary:'An operational analysis of 1.55 million synthetic events across emergency, inpatient and outpatient services.',question:'Where do delays occur between ED arrival, assessment, disposition and inpatient placement?',work:['Used DuckDB and Python to validate timestamps, encounter counts, transfers and disposition records.','Measured ED wait-time distributions, boarding and inpatient lengths of stay.','The synthetic ED cohort had 219,384 arrivals, with a median assessment wait of 46 minutes and a 90th percentile of 115 minutes.'],tools:['Python','DuckDB','SQL','Power BI'],repo:'hospital-patient-flow-analytics'},
 {title:'Hospital Readmission Analysis',area:'Healthcare',tone:'peach',visual:'bars',summary:'Exploratory analysis of readmission patterns in a public diabetes dataset.',question:'Which encounter and patient characteristics are associated with readmission in this dataset?',work:['Explored length of stay, prior utilization, medication and diagnosis variables.','Compared readmission patterns across age groups and other available characteristics.','Documented the workflow and visual findings in a reproducible notebook and repository.'],tools:['Python','pandas','Matplotlib'],repo:'hospital-operations-analytics'},
 {title:'Emergency Department Flow Optimization',area:'Healthcare',tone:'mint',visual:'flow',summary:'A capstone using real-world Hôpital Montfort data to study ED bottlenecks with process mining and discrete-event simulation.',question:'How can process mining and simulation help compare patient-flow and resource allocation scenarios?',work:['Mapped care trajectories with process mining and translated the workflow into an Arena simulation.','Compared baseline and alternative configurations across replicated runs after a warm-up period.','Summarized how the scenarios affected queues and resource utilization. The project used real-world Hôpital Montfort data. The underlying hospital data is confidential and cannot be shared.'],tools:['Python','pm4py','Arena','Discrete-event simulation']},
 {title:'Saskatchewan Barley Price Forecasting',evidence:'barley',area:'Forecasting & statistics',tone:'peach',visual:'trend',summary:'A group forecasting project comparing ARIMA and ETS on monthly Saskatchewan barley prices.',question:'How do ARIMA and ETS model monthly barley prices, and what do their 36-month forecasts look like?',work:['Filtered Statistics Canada data to Saskatchewan barley prices and converted it to a monthly tsibble.','Fit ARIMA and ETS models, inspected residual diagnostics, and generated 36-month forecasts.','Tabulated AIC, AICc and BIC alongside in-sample RMSE, MAE and MAPE.'],tools:['R','fpp3','Time-series analysis']},
 {title:'Applied Biostatistics',evidence:'climate',area:'Forecasting & statistics',tone:'violet',visual:'scatter',summary:'Statistical modeling and diagnostics, with an original case study on temperature trends across six Canadian weather stations.',question:'Do the selected higher-latitude stations show faster temperature increases than the selected lower-latitude stations?',work:['Analyzed monthly Environment Canada observations from three higher-latitude and three lower-latitude stations.','Fit station-level regression models in R and used diagnostic checks, including RESET tests.','Interpreted the trends within the scope of the selected stations.','Additional biostatistics coursework covered t-tests, ANOVA and ANCOVA for group comparisons.'],tools:['R','Regression','Model diagnostics','ANOVA','ANCOVA']},
];
const art = {
 pipeline:'<rect x="49" y="39" width="65" height="54" rx="9"/><rect x="147" y="39" width="65" height="54" rx="9"/><rect x="245" y="39" width="65" height="54" rx="9"/><path d="M114 66h33m65 0h33M68 55h27m-27 11h27m-27 11h27m74-22h27m-27 11h27m-27 11h27m74-22h27m-27 11h27m-27 11h27"/>',
 flow:'<path d="M52 64h70l62-32h88m-150 32 62 34h88"/><circle cx="52" cy="64" r="12"/><circle cx="122" cy="64" r="12"/><circle cx="184" cy="32" r="12"/><circle cx="184" cy="98" r="12"/><circle cx="272" cy="32" r="12"/><circle cx="272" cy="98" r="12"/>',
 bars:'<path d="M47 108h270"/><rect x="72" y="60" width="26" height="48" rx="4"/><rect x="119" y="46" width="26" height="62" rx="4"/><rect x="166" y="71" width="26" height="37" rx="4"/><rect x="213" y="28" width="26" height="80" rx="4"/><rect x="260" y="39" width="26" height="69" rx="4"/>',
 trend:'<path d="M45 21v86h275M52 96l38-20 39 11 39-34 39 9 38-26 38 12"/><path d="M207 62l38-14 38-17 35-9" stroke-dasharray="5 5"/>',
 scatter:'<path d="M43 23v84h271M51 95l247-68" stroke-dasharray="5 5"/><circle cx="82" cy="85" r="6"/><circle cx="114" cy="77" r="6"/><circle cx="154" cy="85" r="6"/><circle cx="161" cy="54" r="6"/><circle cx="201" cy="48" r="6"/><circle cx="237" cy="63" r="6"/><circle cx="275" cy="32" r="6"/>',
};
const visual = p => '<div class="visual" data-tone="'+p.tone+'" aria-hidden="true"><svg viewBox="0 0 360 132" fill="none" stroke="#42365e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+art[p.visual]+'</svg></div>';
const escapeCode = code => code.replace(/[&<>]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]));
const codeBlock = code => '<details><summary>View R code</summary><pre tabindex="0"><code>'+escapeCode(code)+'</code></pre></details>';
function climateFigure(index) {
 const plot = courseworkEvidence.climate[index];
 return '<figure><img src="evidence/'+plot.file+'" alt="Annual mean temperature over time with a linear fit for '+plot.label+'"><figcaption>'+plot.label+' · Original coursework plot</figcaption></figure>'+codeBlock(plot.code);
}
function evidence(project) {
 if (project.evidence==='climate') {
  return '<section class="evidence"><h3>Results and code</h3><p>Explore the original Canadian weather station plots and the R code used to generate them.</p><label for="plot-select">Station</label> <select id="plot-select">'+courseworkEvidence.climate.map((plot,i)=>'<option value="'+i+'"'+(i===6?' selected':'')+'>'+plot.label+'</option>').join('')+'</select><div id="plot">'+climateFigure(6)+'</div></section>';
 }
 if (project.evidence==='barley') {
  return '<section class="evidence"><h3>Forecasting code</h3><p>The original script generates monthly price plots, residual diagnostics, 36-month forecasts and a model comparison table. Running it requires the original Statistics Canada CSV.</p>'+codeBlock(courseworkEvidence.barley)+'<a class="outline" href="evidence/barley-forecast.R" download>Download R script ↓</a></section>';
 }
 return '';
}
const metadata = p => '<div class="meta">'+p.area+' · '+(p.repo?'GitHub project':'Coursework')+' · <span class="'+(p.status?'ongoing':'')+'">'+(p.status||'Completed')+'</span></div>';
const filters = ['All projects',...new Set(projects.map(p=>p.area))];
const filterList = document.getElementById('filters');
const container = document.getElementById('projects');
const dialog = document.getElementById('case');
filterList.innerHTML = filters.map((name,i)=>'<button type="button" data-filter="'+i+'" aria-pressed="'+(i===0)+'">'+name+'</button>').join('');
function showProjects(filter=0) {
 const selected = projects.filter(p=>filter===0||p.area===filters[filter]);
 document.getElementById('count').textContent = selected.length+' '+(selected.length===1?'project':'projects');
 container.innerHTML = selected.map(p=>'<article class="card">'+visual(p)+'<div class="card-body">'+metadata(p)+'<h3>'+p.title+'</h3><p>'+p.summary+'</p><button type="button" class="open" aria-label="View case study for '+p.title+'" data-project="'+projects.indexOf(p)+'">View case study ↗</button></div></article>').join('');
}
filterList.addEventListener('click',e=>{
 const button = e.target.closest('[data-filter]');
 if (!button) return;
 filterList.querySelector('[aria-pressed=true]').setAttribute('aria-pressed','false');
 button.setAttribute('aria-pressed','true');
 showProjects(Number(button.dataset.filter));
});
container.addEventListener('click',e=>{
 const button = e.target.closest('[data-project]');
 if (!button) return;
 openCaseStudy(projects[Number(button.dataset.project)]);
});
function openCaseStudy(p) {
 document.getElementById('detail').innerHTML = visual(p)+'<div class="detail-body">'+metadata(p)+'<h2 id="case-title">'+p.title+'</h2><h3>Project question</h3><p>'+p.question+'</p><h3>My work</h3><ul>'+p.work.map(point=>'<li>'+point+'</li>').join('')+'</ul><div class="stack">'+p.tools.map(tool=>'<span>'+tool+'</span>').join('')+'</div>'+(p.repo?'<a class="outline" href="'+github+p.repo+'" target="_blank" rel="noopener noreferrer">View GitHub repository ↗</a>':'')+evidence(p)+'</div>';
 dialog.showModal();
}
document.getElementById('skills').addEventListener('click',e=>{
 const button=e.target.closest('[data-case-link]');
 if (!button) return;
 const project=projects.find(p=>p.title===button.dataset.caseLink);
 if (project) openCaseStudy(project);
});
dialog.addEventListener('change',e=>{
 if (e.target.id==='plot-select') document.getElementById('plot').innerHTML=climateFigure(Number(e.target.value));
});
document.getElementById('close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
showProjects();
