import { PieChart } from '@mui/x-charts/PieChart';


export default function DataPieChart({ data }) {
    return (
        <PieChart
            series={
                [{
                    data,
                    innerRadius: 35,
                    outerRadius: 60,
                }]
            }
            legend={{

            }}
            height={250}
            margin={{
                right: 150
            }}
        />
    );
}