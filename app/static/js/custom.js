let companyPiChart;
let companyBarChart;
let revenue;
let grossProfit;
let operatingIncome;
let netIncome;
let revenueShare;
let ebitda;

function updateCompanyPiChart(){
	let companyPiCanvas = document.getElementById("companyPiChart")
	let companyPiCtx = companyPiCanvas.getContext('2d');
    console.log(revenue, grossProfit, operatingIncome, netIncome, revenueShare, ebitda)
	companyPiCtx.clearRect(0, 0, companyPiCanvas.width, companyPiCanvas.height);
	if(companyPiChart !== undefined){
		companyPiChart.destroy();
	}
	companyPiChart = new Chart(companyPiCtx, {
	  type: 'pie',
	  data: {
	    labels: ["Revenue", "Gross Profit", "Operating Income", "Net Income to Company", "Revenue Per Share", "EBITDA"],
	    datasets: [{
	      backgroundColor: [
	        "#2ecc71",
	        "#3498db",
	        "#95a5a6",
	        "#9b59b6",
            "#f1c40f",
            "#e74c3c",
	      ],
	      data: [revenue, grossProfit, operatingIncome, netIncome, revenueShare, ebitda]
	    }]
	  },
      options: {
            maintainAspectRatio: false,
            plugins: {
                legend: false // Hide legend
            },
            scales: {
                y: {
                    display: false // Hide Y axis labels
                },
                x: {
                    display: false // Hide X axis labels
                }
            }   
        }
	});
}

function updateCompanyBarChart(){
	let companyBarCanvas = document.getElementById("companyBarChart")
	let companyBarCtx = companyBarCanvas.getContext('2d');
	companyBarCtx.clearRect(0, 0, companyBarCanvas.width, companyBarCanvas.height);
	if(companyBarChart !== undefined){
		companyBarChart.destroy();
	}
	companyBarChart = new Chart(companyBarCtx, {
	  type: 'bar',
	  data: {
	    labels: ["Revenue", "Gross Profit", "Operating Income", "Net Income to Company", "Revenue Per Share", "EBITDA"],
	    datasets: [{
	      backgroundColor: [
	        "#2ecc71",
	        "#2ecc71",
	        "#2ecc71",
	        "#2ecc71",
            "#2ecc71",
            "#2ecc71",
	      ],
	      data: [revenue, grossProfit, operatingIncome, netIncome, revenueShare, ebitda],
          label: "Analytics"
	    }]
	  },
      options: {
        maintainAspectRatio: true,
        plugins: {
            legend: true // Hide legend
        },
        scales: {
            y: {
                display: true // Hide Y axis labels
            },
            x: {
                display: false, // Hide X axis labels
            },
        }   
    }
	});
}


$("td a.row-link").click(function(e) {
    console.log(e)
    let name = $(this).attr("data-name")
    let tick = $(this).attr("data-tick")
    let year = $(this).attr("data-year")
    let price = $(this).attr("data-price")
    let sector = $(this).attr("data-sector")
    let industry = $(this).attr("data-industry")
    $.ajax({
        type: "GET",
        url: "/getCompanyDetails",
        data: { 
            tick: tick , // < note use of 'this' here
            year: year  
        },
        success: function(result) {
            $("#companyTableRight tbody").html(` `);
            let tbody = `
                            <tr>
                                <td>
                                    `+name+`
                                </td>
                                <td>
                                    `+tick+`
                                </td>
                                <td>
                                    `+price+`
                                </td>
                                <td>
                                    `+sector+`
                                </td>
                                <td>
                                    `+industry+`
                                </td>
                                <td>
                                    `+year+`
                                </td>
                            </tr>`
            $("#companyTableRight tbody").append(tbody);
            result = result['year_data']
            console.log(result)
            revenue=result['Revenues']
            grossProfit=result['Gross Profit']
            operatingIncome=result['Operating Income']
            netIncome=result['Net Income to Company']
            revenueShare=result['Revenue Per Share']
            ebitda=result['EBITDA']
            
            updateCompanyPiChart()
            updateCompanyBarChart()

        },
        error: function(result) {
            console.log('error');
        }
    });
});