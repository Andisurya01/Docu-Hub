// Nih klo lu mau test data dari Google Sheetsnya
// Link Aseli: https://docs.google.com/spreadsheets/d/1jAh6j_cky7S53NUlpPZsZPizoKrAplEwYMdPHYMm6KU/edit?pli=1&gid=592645526#gid=592645526
const fetchSheetData = async () => {
  try {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUuzqQ6xAHBTytkw4PNZ4HfFbw26z2WZzOFAlcidZ-k2wHXXDixJD8mFe3Z0dTRL5aCnPzoMSammB_/pub?gid=592645526&single=true&output=csv";
    
    const response = await fetch(csvUrl);
    const csvData = await response.text();
    console.log(response);
    
    const rows = csvData.split('\n');
    
    const projects = [];
    let currentProject = null;
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      const no = row[0]?.trim();
      const project = row[1]?.trim();
      const engineering = row[2]?.trim();
      const link = row[3]?.trim();
      
      if (no && project) {
        if (currentProject) {
          projects.push(currentProject);
        }
        currentProject = {
          no,
          project,
          engineering: []
        };
      }
      
      if (engineering && currentProject) {
        currentProject.engineering.push({
          type: engineering,
          link: link || null
        });
      }
    }
    
    if (currentProject) {
      projects.push(currentProject);
    }
    
    return projects;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
};

(async () => {
  const projects = await fetchSheetData();
  console.log("Processed Projects Data:");
  console.log(JSON.stringify(projects, null, 2));
})();