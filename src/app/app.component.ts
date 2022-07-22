import { Component, OnInit, ViewChild, HostListener, HostBinding } from '@angular/core';
import tradersJson from 'src/assets/data/traders.json';
import { createChart } from 'lightweight-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('traderChart') traderChart:any;
  title = 'mtrading';
  traders:any;
  activeTrader:number = 0;
  elWidth:number = 0;
  private el:any;
  chart:any;
  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.resizeWorks();
  }

  @HostBinding('style.height.px')

  private resizeWorks(): void {
    this.elWidth = this.traderChart.nativeElement.offsetWidth;
    this.chart.resize(this.elWidth,280);
    this.chart.timeScale().fitContent();
  }

  ngOnInit(){
    this.traders = Array.from(tradersJson).sort(() => .5 - Math.random()).slice(0,4)
  }

  ngAfterViewInit(){
    this.chart = createChart(this.traderChart.nativeElement, { width: this.elWidth, height: 280 });
    this.drawChart();
  }

  changeActiveTrader(index:number){
    this.chart.remove();
    this.chart = createChart(this.traderChart.nativeElement, { width: this.elWidth, height: 280 });
    this.activeTrader = index;
    this.drawChart();
  }

  drawChart(){
    let lineSeries = this.chart.addLineSeries({
      color: "#8824f3",
    });
    lineSeries.setData(this.createTraderChartData());
    this.chart.timeScale().fitContent();
  }

  showTraderInfo(){
    console.log(this.traders[this.activeTrader]);
  }

  createTraderChartData(){
    let data = this.traders[this.activeTrader].chart;
    let chartData = [];
    for (var i = 0; i<data.length; i++){
      let tmpDate = new Date();
      tmpDate.setDate(tmpDate.getDate()-data.length+i);
      let chartDate = tmpDate.getFullYear() + '-' + ('0' + (tmpDate.getMonth()+1)).slice(-2) + '-' + ('0' +  tmpDate.getDate()).slice(-2)
      chartData.push({time: chartDate, value: this.traders[this.activeTrader].chart[i]})
    }
    return chartData;
  }

}
