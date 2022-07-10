import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

export const Chart_ = ({ chartData }) => {
  return (
    <div className="chart">
      <Doughnut
        data={{
          datasets: [
            {
              data: [chartData.per, 10 - chartData.per],
              backgroundColor: [chartData.color, "#E3E3E3"],
              cutout: "85%",
              borderRadius: [20, 0],
              borderWidth: 0,
            },
          ],
        }}
      />
      <div class="doughnut-inner">
        <h5>{chartData.per}</h5>
      </div>
      <h4>{chartData.key}</h4>
    </div>
  );
};
