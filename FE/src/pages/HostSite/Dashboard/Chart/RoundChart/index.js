import { Card, Title, DonutChart, Button, Flex } from '@tremor/react';

const rate = [
    {
        name: '5 stars',
        votes: 9800,
    },
    {
        name: '4 stars',
        votes: 4567,
    },
    {
        name: '3 stars',
        votes: 3908,
    },
    {
        name: '2 stars',
        votes: 2400,
    },
    {
        name: '1 star',
        votes: 1908,
    },
];

//const valueFormatter = (number) => ` ${Intl.NumberFormat('us').format(number).toString()}`;

export const RoundChart = () => (
    <Card>
        <Title>Vote</Title>
        <DonutChart
            className="mt-6 h-96"
            data={rate}
            category="votes"
            index="name"
            variant="pie"
            showLabel="true"
            // valueFormatter={valueFormatter}
            colors={['red', 'amber', 'indigo', 'lime', 'slate']}
        />
        <Flex justifyContent="end" className="space-x-2">
            <Button size="xs" variant="primary" onClick={() => console.log('clicked')}>
                View more
            </Button>
        </Flex>
    </Card>
);
