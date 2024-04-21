import React, { useContext } from 'react'
import ReactEcharts from 'echarts-for-react';
import { DataContext } from '../Context';

function Graph() {

    const { chatData } = useContext(DataContext)

    const getTopPosters = (arr) => {
        const top5 = arr.data.slice(0, 5).map((i) => ({
            name: i.user_id,
            value: i.msgs.length
        }));

        return top5
    }

    const option = {
        title: {
            text: 'Top Posters',
            subtext: 'Chat ID: ' + chatData.id,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: getTopPosters(chatData),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const bars = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };

    return (
        <div className='flex flex-col mt-10'>
            <ReactEcharts
                option={option}
                style={{
                    // width: "1200px",
                    height: "600px",
                }}
            />

            {/* <ReactEcharts
                option={bars}
                style={{
                    // width: "1200px",
                    height: "600px",
                }}
            /> */}
        </div>
    )
}

export default Graph