import { useState } from 'react';
import { Card, Grid, Tab, TabList, Text, Title } from '@tremor/react';
import KpiCard from '../KpiCard';
import PerformanceChart from '../PerformanceChart';
import Admin from '../../../../Admin/Admin';
import { RoundChart } from '../RoundChart';

export default function KpiCardGrid() {
    const [selectedView, setSelectedView] = useState('1');
    return (
        <main className="bg-slate-50 p-2 sm:p-10 ml-0 grid-rows-2">
            <Title className="text-4xl font-bold">Dashboard</Title>
            <Text className="text-l">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

            <TabList defaultValue="1" onValueChange={(value) => setSelectedView(value)} className="mt-6">
                <Tab value="1" text="Overview" />
                <Tab value="2" text="Detail" />
            </TabList>

            {selectedView === '1' ? (
                <>
                    <Grid numColsLg={3} className="mt-6 gap-6">
                        <KpiCard />
                        <KpiCard />
                        <KpiCard />
                    </Grid>
                    <Grid className="flex gap-6">
                        <div className="mt-6 w-2/3">
                            <PerformanceChart />
                        </div>
                        <div className="mt-6 w-1/3">
                            <RoundChart />
                        </div>
                    </Grid>
                </>
            ) : (
                <Card className="mt-6 p-0">
                    <Admin />
                </Card>
            )}
        </main>
    );
}
