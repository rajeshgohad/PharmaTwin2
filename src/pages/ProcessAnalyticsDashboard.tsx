import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Activity, AlertTriangle, CheckCircle, TrendingUp, Thermometer, Gauge, Droplets, FlaskConical, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

export const ProcessAnalyticsDashboard = () => {
  const navigate = useNavigate();
  
  // Get batch number from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedBatch = urlParams.get('batch') || 'BATCH-2024-315';

  const kpiData = [
    { 
      name: 'Reactor Temperature', 
      current: 37.2, 
      target: 37.0, 
      previous: 37.1,
      unit: '°C', 
      status: 'normal',
      icon: Thermometer,
      color: 'text-blue-600'
    },
    { 
      name: 'Pressure', 
      current: 2.1, 
      target: 2.0, 
      previous: 1.9,
      unit: 'bar', 
      status: 'high',
      icon: Gauge,
      color: 'text-orange-600'
    },
    { 
      name: 'Flow Rate', 
      current: 45.8, 
      target: 45.0, 
      previous: 44.5,
      unit: 'L/min', 
      status: 'normal',
      icon: Droplets,
      color: 'text-cyan-600'
    },
    { 
      name: 'pH Level', 
      current: 5.8, 
      target: 7.0, 
      previous: 6.8,
      unit: '', 
      status: 'critical',
      icon: FlaskConical,
      color: 'text-red-600',
      highlight: true
    },
    { 
      name: 'Biomass', 
      current: 12.4, 
      target: 12.0, 
      previous: 11.2,
      unit: 'g/L', 
      status: 'normal',
      icon: Zap,
      color: 'text-purple-600',
      highlight: true
    }
  ];

  const chartData = [
    { time: '00:00', temperature: 36.8, pressure: 1.95, flowRate: 44.2, pH: 5.8, biomass: 10.8, prevpH: 6.7, prevBiomass: 10.2 },
    { time: '00:30', temperature: 37.0, pressure: 1.98, flowRate: 44.8, pH: 5.8, biomass: 11.2, prevpH: 6.8, prevBiomass: 10.5 },
    { time: '01:00', temperature: 37.1, pressure: 2.02, flowRate: 45.1, pH: 5.8, biomass: 11.6, prevpH: 6.8, prevBiomass: 10.8 },
    { time: '01:30', temperature: 37.3, pressure: 2.05, flowRate: 45.5, pH: 5.8, biomass: 12.0, prevpH: 6.9, prevBiomass: 11.0 },
    { time: '02:00', temperature: 37.2, pressure: 2.08, flowRate: 45.8, pH: 5.8, biomass: 12.3, prevpH: 6.8, prevBiomass: 11.1 },
    { time: '02:30', temperature: 37.0, pressure: 2.1, flowRate: 46.0, pH: 5.8, biomass: 12.5, prevpH: 6.7, prevBiomass: 11.2 },
    { time: '03:00', temperature: 37.2, pressure: 2.1, flowRate: 45.8, pH: 5.8, biomass: 12.4, prevpH: 6.8, prevBiomass: 11.2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Real Time Process Monitoring</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-lg font-semibold text-primary">Batch: {selectedBatch}</div>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 21 }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${
                      i + 1 === 8 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Day {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">Live monitoring of critical process parameters</p>
          </div>
        </div>


        {/* Real-time KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const variance = ((kpi.current - kpi.target) / kpi.target * 100).toFixed(1);
            const batchChange = ((kpi.current - kpi.previous) / kpi.previous * 100).toFixed(1);
            const isIncreasing = kpi.current > kpi.previous;
            const TrendIcon = isIncreasing ? ArrowUp : ArrowDown;
            const trendColor = isIncreasing ? 'text-green-600' : 'text-red-600';
            return (
              <Card key={index} className={kpi.highlight ? 'ring-2 ring-primary/20' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                    <Badge variant="outline" className={getStatusColor(kpi.status)}>
                      {kpi.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {kpi.current}{kpi.unit}
                      </span>
                      <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {kpi.target}{kpi.unit} ({parseFloat(variance) > 0 ? '+' : ''}{variance}%)
                    </div>
                    <div className="text-xs text-primary">
                      vs Previous: {kpi.previous}{kpi.unit} ({parseFloat(batchChange) > 0 ? '+' : ''}{batchChange}%)
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Parameters Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature, Pressure, Flow Rate Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Parameters</CardTitle>
              <CardDescription>Temperature, Pressure & Flow Rate monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="temp-pressure" domain={[35, 40]} />
                    <YAxis yAxisId="flow" orientation="right" domain={[40, 50]} />
                    <Tooltip />
                    <Legend />
                    
                    {/* Tolerance areas */}
                    <ReferenceArea yAxisId="temp-pressure" y1={36.5} y2={37.5} fill="#dc2626" fillOpacity={0.1} />
                    <ReferenceArea yAxisId="temp-pressure" y1={1.5} y2={2.5} fill="#ea580c" fillOpacity={0.1} />
                    <ReferenceArea yAxisId="flow" y1={44.5} y2={45.5} fill="#0891b2" fillOpacity={0.1} />
                    
                    {/* Target reference lines */}
                    <ReferenceLine yAxisId="temp-pressure" y={37.0} stroke="#dc2626" strokeDasharray="5 5" />
                    <ReferenceLine yAxisId="temp-pressure" y={2.0} stroke="#ea580c" strokeDasharray="5 5" />
                    <ReferenceLine yAxisId="flow" y={45.0} stroke="#0891b2" strokeDasharray="5 5" />
                    
                    {/* Parameter lines */}
                    <Line 
                      yAxisId="temp-pressure" 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#dc2626" 
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line 
                      yAxisId="temp-pressure" 
                      type="monotone" 
                      dataKey="pressure" 
                      stroke="#ea580c" 
                      strokeWidth={2}
                      name="Pressure (bar)"
                    />
                    <Line 
                      yAxisId="flow" 
                      type="monotone" 
                      dataKey="flowRate" 
                      stroke="#0891b2" 
                      strokeWidth={2}
                      name="Flow Rate (L/min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* pH and Biomass Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Biological Parameters</CardTitle>
              <CardDescription>pH Level & Biomass monitoring with targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="ph" domain={[6.0, 7.5]} />
                    <YAxis yAxisId="biomass" orientation="right" domain={[10, 13]} />
                    <Tooltip />
                    <Legend />
                    
                    {/* Tolerance areas */}
                    <ReferenceArea yAxisId="ph" y1={6.5} y2={7.5} fill="#16a34a" fillOpacity={0.1} />
                    <ReferenceArea yAxisId="biomass" y1={11.5} y2={12.5} fill="#9333ea" fillOpacity={0.1} />
                    
                    {/* Target reference lines */}
                    <ReferenceLine yAxisId="ph" y={7.0} stroke="#16a34a" strokeDasharray="5 5" />
                    <ReferenceLine yAxisId="biomass" y={12.0} stroke="#9333ea" strokeDasharray="5 5" />
                    
                    {/* Current batch lines */}
                    <Line 
                      yAxisId="ph" 
                      type="monotone" 
                      dataKey="pH" 
                      stroke="#dc2626" 
                      strokeWidth={3}
                      name="pH Level (Current)"
                    />
                    <Line 
                      yAxisId="biomass" 
                      type="monotone" 
                      dataKey="biomass" 
                      stroke="#9333ea" 
                      strokeWidth={3}
                      name="Biomass (g/L)"
                    />
                    
                    {/* Previous batch lines */}
                    <Line 
                      yAxisId="ph" 
                      type="monotone" 
                      dataKey="prevpH" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      name="pH Level (Prev Batch)"
                    />
                    <Line 
                      yAxisId="biomass" 
                      type="monotone" 
                      dataKey="prevBiomass" 
                      stroke="#9333ea" 
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      name="Biomass (Prev Batch)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Deviation Alert */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Critical pH Deviation Alert
            </CardTitle>
            <CardDescription>pH has dropped below acceptable tolerance - Immediate action required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">pH Level Status</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '12:00', pH: 7.0, target: 7.0 },
                      { time: '13:00', pH: 6.8, target: 7.0 },
                      { time: '14:00', pH: 6.6, target: 7.0 },
                      { time: '14:30', pH: 6.4, target: 7.0 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6.0, 7.5]} />
                      <Tooltip />
                      <Legend />
                      {/* Tolerance area */}
                      <ReferenceArea y1={6.5} y2={7.5} fill="#16a34a" fillOpacity={0.1} />
                      {/* Critical zone */}
                      <ReferenceArea y1={6.0} y2={6.5} fill="#dc2626" fillOpacity={0.2} />
                      <ReferenceLine y={7.0} stroke="#16a34a" strokeDasharray="5 5" label="Target (7.0)" />
                      <ReferenceLine y={6.5} stroke="#f59e0b" strokeDasharray="3 3" label="Lower Tolerance" />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke="#dc2626" 
                        strokeWidth={3}
                        name="Actual pH"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current pH</p>
                    <p className="text-2xl font-bold text-red-600">5.8</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target pH</p>
                    <p className="text-2xl font-bold">7.0</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deviation</p>
                    <p className="text-2xl font-bold text-red-600">-1.2</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Biomass Status</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '12:00', biomass: 12.8, target: 13.0 },
                      { time: '13:00', biomass: 12.6, target: 13.0 },
                      { time: '14:00', biomass: 12.2, target: 13.0 },
                      { time: '14:30', biomass: 11.8, target: 13.0 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[11, 14]} />
                      <Tooltip />
                      <Legend />
                      {/* Tolerance area */}
                      <ReferenceArea y1={12.5} y2={13.5} fill="#9333ea" fillOpacity={0.1} />
                      <ReferenceLine y={13.0} stroke="#9333ea" strokeDasharray="5 5" label="Target (13%)" />
                      <ReferenceLine y={12.5} stroke="#f59e0b" strokeDasharray="3 3" label="Lower Tolerance" />
                      <Line 
                        type="monotone" 
                        dataKey="biomass" 
                        stroke="#9333ea" 
                        strokeWidth={3}
                        name="Actual Biomass"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current Biomass</p>
                    <p className="text-2xl font-bold text-orange-600">11.8%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target Biomass</p>
                    <p className="text-2xl font-bold">13.0%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deviation</p>
                    <p className="text-2xl font-bold text-orange-600">-1.2%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-900">Critical Deviation Detected</p>
                  <p className="text-sm text-red-700">Set Point = 7.0 +/- 1.0 | Current Value = 5.8</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => navigate('/root-cause-analysis')}
                >
                  Initiate Investigation? (AI Powered)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batch Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Comparison - pH & Biomass</CardTitle>
            <CardDescription>Current batch vs previous batch performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">pH Level Comparison</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6.5, 7.5]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceArea y1={6.5} y2={7.5} fill="#16a34a" fillOpacity={0.1} />
                      <ReferenceLine y={7.0} stroke="#16a34a" strokeDasharray="5 5" label="Target" />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        name="Current Batch"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prevpH" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        strokeDasharray="8 4"
                        name="Previous Batch"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Biomass Comparison</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[10, 13]} />
                      <Tooltip />
                      <Legend />
                      <ReferenceArea y1={11.5} y2={12.5} fill="#9333ea" fillOpacity={0.1} />
                      <ReferenceLine y={12.0} stroke="#9333ea" strokeDasharray="5 5" label="Target" />
                      <Line 
                        type="monotone" 
                        dataKey="biomass" 
                        stroke="#9333ea" 
                        strokeWidth={3}
                        name="Current Batch"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prevBiomass" 
                        stroke="#9333ea" 
                        strokeWidth={2}
                        strokeDasharray="8 4"
                        name="Previous Batch"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Process Alerts</CardTitle>
            <CardDescription>Real-time parameter alerts and system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="font-medium text-orange-900">Pressure Above Target</p>
                  <p className="text-sm text-orange-700">Reactor pressure at 2.1 bar (target: 2.0 bar)</p>
                </div>
                <span className="text-xs text-orange-600">Live</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Flow Rate Variance</p>
                  <p className="text-sm text-blue-700">Flow rate 1.8% above target (45.8 L/min vs 45.0 L/min)</p>
                </div>
                <span className="text-xs text-blue-600">2 min ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-900">All Parameters Stable</p>
                  <p className="text-sm text-green-700">Temperature and pH levels within acceptable range</p>
                </div>
                <span className="text-xs text-green-600">Ongoing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real Time Process Monitoring Box */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real Time Process Monitoring
            </CardTitle>
            <CardDescription>Live monitoring status for {selectedBatch}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-background rounded-lg border">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">System Status</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <Activity className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Data Streaming</p>
                <p className="text-xs text-blue-600">Active</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Alerts</p>
                <p className="text-xs text-red-600">1 Critical</p>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border">
                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Monitoring</p>
                <p className="text-xs text-purple-600">5 Parameters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};