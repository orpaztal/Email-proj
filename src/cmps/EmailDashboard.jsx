import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types'

ChartJS.register(ArcElement,RadialLinearScale, Tooltip, Legend);

export function EmailDashboard({ numOfRead, numOfUnread, numOfDeleted }) {
    const data = {
        labels: ['# of Read', '# of Unread', '# of Deleted'],
        datasets: [
            {
                label: '# of Votes',
                data: [numOfRead, numOfUnread, numOfDeleted],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <section style={{ maxHeight: '70vh' }}>
            <Doughnut data={data} />
        </section>
    )
}

EmailDashboard.propTypes = {
    numOfRead: PropTypes.number.isRequired,
    numOfUnread: PropTypes.number.isRequired,
    numOfDeleted: PropTypes.number.isRequired
}