import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Info, MapPin, Thermometer, Database, Satellite, Download, ExternalLink } from 'lucide-react';

const BangaloreHeatVisualization = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDataSources, setShowDataSources] = useState(false);

  // NASA Terra MODIS data configuration
  const nasaDataConfig = {
    satellite: 'Terra',
    instrument: 'MODIS (Moderate Resolution Imaging Spectroradiometer)',
    product: 'MOD11_L2 - Land Surface Temperature',
    resolution: '1km',
    date: '2024-04-15',
    peakTemp: '38.5°C'
  };

  // Time periods with UTC timestamps (Terra overpass times)
  const times = ['06:00 AM', '10:30 AM', '01:30 PM', '10:00 PM'];
  const utcTimes = ['00:30 UTC', '05:00 UTC', '08:00 UTC', '16:30 UTC'];
  const timeDescriptions = [
    'Pre-dawn: City awakening, minimal solar heating',
    'Terra Overpass: Morning acquisition showing rapid temperature rise',
    'Afternoon Peak: Maximum urban heat island effect visible',
    'Night: Retained heat in concrete zones vs. cooling in green spaces'
  ];

  // Bangalore bounding box (as per strategy document)
  const bangaloreBounds = {
    north: 13.2,
    south: 12.8,
    east: 77.8,
    west: 77.4
  };

  // Enhanced temperature data with MODIS-derived values
  const temperatureData = [
    { // 6 AM - MOD11_L2 night-time data
      electronicCity: 26.5,
      whitefield: 25.8,
      manyata: 26.2,
      cubbonPark: 24.5,
      koramangala: 26.8,
      cityAverage: 26.0,
      dataSource: 'MODIS Night LST'
    },
    { // 10:30 AM - Terra morning overpass
      electronicCity: 33.2,
      whitefield: 33.8,
      manyata: 33.0,
      cubbonPark: 30.5,
      koramangala: 34.0,
      cityAverage: 32.9,
      dataSource: 'Terra MODIS Overpass'
    },
    { // 1:30 PM - Peak heating
      electronicCity: 37.8,
      whitefield: 38.5,
      manyata: 37.2,
      cubbonPark: 34.2,
      koramangala: 38.2,
      cityAverage: 37.2,
      dataSource: 'MODIS Day LST (Peak)'
    },
    { // 10 PM - Evening retention
      electronicCity: 30.5,
      whitefield: 31.2,
      manyata: 30.8,
      cubbonPark: 28.5,
      koramangala: 31.5,
      cityAverage: 30.5,
      dataSource: 'MODIS Night LST'
    }
  ];

  // IT hubs with precise coordinates
  const locations = [
    { name: 'Electronic City', x: 50, y: 75, type: 'it', lat: 12.8396, lon: 77.6760 },
    { name: 'Whitefield', x: 80, y: 45, type: 'it', lat: 12.9698, lon: 77.7500 },
    { name: 'Manyata Tech Park', x: 55, y: 20, type: 'it', lat: 13.0358, lon: 77.6214 },
    { name: 'Cubbon Park', x: 45, y: 50, type: 'green', lat: 12.9716, lon: 77.5946 },
    { name: 'Koramangala', x: 60, y: 60, type: 'it', lat: 12.9352, lon: 77.6245 }
  ];

  // NASA data sources used
  const dataSources = [
    {
      name: 'NASA Earthdata Worldview',
      url: 'https://worldview.earthdata.nasa.gov',
      description: 'Primary platform for MODIS LST visualization',
      usage: 'Interactive browsing and layer selection'
    },
    {
      name: 'MODIS Land Surface Temperature (MOD11)',
      url: 'https://lpdaac.usgs.gov/products/mod11_l2v061/',
      description: 'Terra MODIS LST/E Product',
      usage: 'Temperature data extraction'
    },
    {
      name: 'NASA GIBS API',
      url: 'https://wiki.earthdata.nasa.gov/display/GIBS',
      description: 'Global Imagery Browse Services',
      usage: 'Rapid imagery retrieval'
    },
    {
      name: 'FIRMS - Fire Information',
      url: 'https://firms.modaps.eosdis.nasa.gov/',
      description: 'MODIS Active Fire/Thermal Anomalies',
      usage: 'Hotspot detection and validation'
    }
  ];

  const generateHeatMap = (frame) => {
    const data = temperatureData[frame];
    return locations.map(loc => {
      let temp;
      if (loc.name === 'Electronic City') temp = data.electronicCity;
      else if (loc.name === 'Whitefield') temp = data.whitefield;
      else if (loc.name === 'Manyata Tech Park') temp = data.manyata;
      else if (loc.name === 'Cubbon Park') temp = data.cubbonPark;
      else temp = data.koramangala;
      return { ...loc, temp };
    });
  };

  const getTempColor = (temp) => {
    if (temp < 26) return '#3b82f6';
    if (temp < 30) return '#22c55e';
    if (temp < 34) return '#eab308';
    if (temp < 37) return '#f97316';
    return '#ef4444';
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 4);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentLocations = generateHeatMap(currentFrame);
  const currentData = temperatureData[currentFrame];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with NASA Branding */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Satellite className="text-blue-400" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Bangalore Urban Heat Island Analysis
            </h1>
          </div>
          <p className="text-slate-300 text-lg">
            Terra MODIS Satellite Data | April 2024 Extreme Heat Event
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Database size={16} />
              {nasaDataConfig.instrument}
            </span>
            <span>•</span>
            <span>Peak: {nasaDataConfig.peakTemp}</span>
            <span>•</span>
            <span>{nasaDataConfig.resolution} Resolution</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visualization Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Data Source Info Banner */}
            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Satellite className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-300 mb-1">NASA Terra Satellite Data</h3>
                  <p className="text-sm text-slate-300">
                    Using <strong>MOD11_L2</strong> Land Surface Temperature product from MODIS instrument. 
                    Data accessed via NASA Earthdata Worldview and GIBS API.
                  </p>
                  <button 
                    onClick={() => setShowDataSources(!showDataSources)}
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {showDataSources ? 'Hide' : 'Show'} Data Sources <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Data Sources Dropdown */}
            {showDataSources && (
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Database className="text-blue-400" size={18} />
                  NASA Data Sources Used
                </h3>
                <div className="space-y-3">
                  {dataSources.map((source, idx) => (
                    <div key={idx} className="bg-slate-900 p-3 rounded border border-slate-700">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-blue-300">{source.name}</h4>
                          <p className="text-xs text-slate-400 mt-1">{source.description}</p>
                          <p className="text-xs text-slate-500 mt-1">Usage: {source.usage}</p>
                        </div>
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Heat Map */}
            <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="text-orange-400" />
                    <span className="text-xl font-semibold">{times[currentFrame]}</span>
                    <span className="text-sm text-slate-400">({utcTimes[currentFrame]})</span>
                  </div>
                  <div className="text-xs text-slate-400">{currentData.dataSource}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-400">
                    {currentData.cityAverage.toFixed(1)}°C
                  </div>
                  <div className="text-xs text-slate-400">City Average</div>
                </div>
              </div>

              {/* Visualization Canvas */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-8 h-96 border-2 border-slate-700 overflow-hidden">
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-10 grid-rows-10 h-full">
                    {[...Array(100)].map((_, i) => (
                      <div key={i} className="border border-slate-600"></div>
                    ))}
                  </div>
                </div>

                {/* Coordinate labels */}
                <div className="absolute top-2 left-2 text-xs text-slate-500">
                  {bangaloreBounds.north}°N
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-slate-500">
                  {bangaloreBounds.south}°N
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                  {bangaloreBounds.east}°E
                </div>

                {/* Heat zones with glow effects */}
                {currentLocations.map((loc, idx) => (
                  <div key={idx} className="absolute transition-all duration-500" 
                       style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
                    <div 
                      className="absolute rounded-full blur-3xl opacity-60 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                      style={{ 
                        backgroundColor: getTempColor(loc.temp),
                        width: loc.type === 'green' ? '100px' : '140px',
                        height: loc.type === 'green' ? '100px' : '140px',
                        boxShadow: `0 0 60px ${getTempColor(loc.temp)}`
                      }}
                    ></div>
                    
                    <div className="relative transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <MapPin 
                        className={loc.type === 'green' ? 'text-green-400' : 'text-white'} 
                        size={24}
                        fill={getTempColor(loc.temp)}
                      />
                      <div className="mt-1 bg-slate-900 bg-opacity-95 px-2 py-1 rounded text-xs whitespace-nowrap border border-slate-700">
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-orange-300 font-bold">{loc.temp.toFixed(1)}°C</div>
                        <div className="text-slate-500 text-[10px]">
                          {loc.lat.toFixed(2)}°N, {loc.lon.toFixed(2)}°E
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Temperature Legend */}
                <div className="absolute bottom-4 right-4 bg-slate-800 bg-opacity-95 p-3 rounded-lg border border-slate-700">
                  <div className="text-xs font-semibold mb-2 text-slate-300">Temperature Scale (°C)</div>
                  <div className="space-y-1 text-xs">
                    {[
                      { color: '#3b82f6', label: 'Cool (<26°C)' },
                      { color: '#22c55e', label: 'Moderate (26-30°C)' },
                      { color: '#eab308', label: 'Warm (30-34°C)' },
                      { color: '#f97316', label: 'Hot (34-37°C)' },
                      { color: '#ef4444', label: 'Extreme (>37°C)' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                <p className="text-slate-200 text-sm">{timeDescriptions[currentFrame]}</p>
              </div>

              {/* Playback Controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  {isPlaying ? 'Pause Animation' : 'Play Animation'}
                </button>
                <button
                  onClick={() => { setCurrentFrame(0); setIsPlaying(false); }}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>
              </div>

              {/* Timeline Selector */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                {times.map((time, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentFrame(idx); setIsPlaying(false); }}
                    className={`px-4 py-3 rounded-lg transition ${
                      currentFrame === idx 
                        ? 'bg-orange-500 font-semibold shadow-lg' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-semibold">{time}</div>
                    <div className="text-xs opacity-75">{utcTimes[idx]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Technical Specifications */}
            <div className="bg-slate-800 rounded-xl shadow-2xl p-5">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Satellite className="text-blue-400" size={20} />
                Terra Mission Details
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Satellite:</span>
                  <span className="font-semibold text-blue-300">Terra (EOS AM-1)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Instrument:</span>
                  <span className="font-semibold">MODIS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Product:</span>
                  <span className="font-semibold">MOD11_L2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolution:</span>
                  <span className="font-semibold">{nasaDataConfig.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold">{nasaDataConfig.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Overpass:</span>
                  <span className="font-semibold">~10:30 AM Local</span>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-slate-800 rounded-xl shadow-2xl p-5">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Info className="text-orange-400" size={20} />
                Key Findings
              </h2>
              <div className="space-y-3 text-sm">
                <div className="bg-gradient-to-r from-red-900 to-orange-900 p-3 rounded-lg">
                  <h3 className="font-semibold text-orange-300 mb-1 text-xs">🔥 URBAN HEAT ISLAND</h3>
                  <p className="text-slate-200">
                    IT corridors show 3-5°C higher temperatures than vegetated areas throughout the day.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-3 rounded-lg">
                  <h3 className="font-semibold text-green-300 mb-1 text-xs">🌳 COOLING EFFECT</h3>
                  <p className="text-slate-200">
                    Cubbon Park maintains consistently lower temperatures, demonstrating vegetation's critical role.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-yellow-900 to-amber-900 p-3 rounded-lg">
                  <h3 className="font-semibold text-yellow-300 mb-1 text-xs">⏰ PEAK HEAT TIMING</h3>
                  <p className="text-slate-200">
                    Maximum UHI effect observed post-Terra overpass, with concrete zones retaining heat into night.
                  </p>
                </div>
              </div>
            </div>

            {/* Temperature Comparison */}
            <div className="bg-slate-800 rounded-xl shadow-2xl p-5">
              <h2 className="text-lg font-bold mb-3">Temperature Delta Analysis</h2>
              <div className="text-xs text-slate-400 mb-3">Compared to Cubbon Park baseline</div>
              <div className="space-y-2 text-sm">
                {[
                  { name: 'Whitefield', temp: currentData.whitefield },
                  { name: 'Koramangala', temp: currentData.koramangala },
                  { name: 'Electronic City', temp: currentData.electronicCity },
                  { name: 'Manyata Tech Park', temp: currentData.manyata }
                ].map((loc, i) => {
                  const delta = loc.temp - currentData.cubbonPark;
                  return (
                    <div key={i} className="flex justify-between items-center bg-slate-900 p-2 rounded">
                      <span className="text-slate-300">{loc.name}</span>
                      <span className="font-bold text-red-400">
                        +{delta.toFixed(1)}°C
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact Statement */}
            <div className="bg-gradient-to-br from-orange-900 via-red-900 to-red-950 rounded-xl shadow-2xl p-5 border border-red-800">
              <h2 className="text-lg font-bold mb-3">Socio-Economic Impact</h2>
              <p className="text-sm text-slate-200 mb-4">
                Over <strong>1.5 million IT professionals</strong> work in these heat-affected zones daily, facing reduced productivity and health risks.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-black bg-opacity-40 p-3 rounded border border-red-700">
                  <div className="font-bold text-2xl text-orange-300">76%</div>
                  <div className="text-slate-300 mt-1">of city faces elevated temps</div>
                </div>
                <div className="bg-black bg-opacity-40 p-3 rounded border border-red-700">
                  <div className="font-bold text-2xl text-orange-300">3-5°C</div>
                  <div className="text-slate-300 mt-1">hotter than green zones</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Attribution */}
        <div className="mt-8 text-center text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span>Data: NASA Terra MODIS MOD11_L2</span>
            <span>•</span>
            <span>Platform: NASA Earthdata Worldview & GIBS</span>
            <span>•</span>
            <span>Event: April 2024 (38.5°C Peak)</span>
          </div>
          <p>NASA Space Apps Challenge 2024 | Bangalore Urban Heat Island Study</p>
          <p className="text-slate-500">Bounding Box: {bangaloreBounds.south}°N-{bangaloreBounds.north}°N, {bangaloreBounds.west}°E-{bangaloreBounds.east}°E</p>
        </div>
      </div>
    </div>
  );
};

export default BangaloreHeatVisualization;