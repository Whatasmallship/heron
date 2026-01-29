import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { getStaticData } from '../services/dataGateway';
import { Lang, Blog } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface HeroSectionProps {
  lang: Lang;
  id: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ lang, id }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blogs = getStaticData<Blog>('blogs');
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const { theme, themeId, isLiquid, isDotMap } = useTheme();

  // Store references for animation
  const mainGroupRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const countriesGroupRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const markersGroupRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const countriesRef = useRef<any>(null);

  // Load world data
  useEffect(() => {
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
      setWorldData(data);
    });
  }, []);

  // Generate dot grid for land areas
  const generateDotGrid = (countries: any, projection: d3.GeoProjection, spacing: number = 8) => {
    const dots: [number, number][] = [];
    const width = mapContainerRef.current?.clientWidth || 800;
    const height = mapContainerRef.current?.clientHeight || 600;

    // Sample points across the projection space
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        // Invert to get geographic coordinates
        const coords = projection.invert?.([x, y]);
        if (coords) {
          const [lng, lat] = coords;
          // Check if point is on land
          for (const feature of countries.features) {
            if (d3.geoContains(feature, [lng, lat])) {
              dots.push([x, y]);
              break;
            }
          }
        }
      }
    }
    return dots;
  };

  // Initial render
  useEffect(() => {
    if (!mapContainerRef.current || !svgRef.current || !worldData) return;

    const width = mapContainerRef.current.clientWidth;
    const height = mapContainerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous
    svg.selectAll("*").remove();

    const mainGroup = svg.append("g").attr("class", "main-group");
    const countriesGroup = mainGroup.append("g").attr("class", "countries");
    const markersGroup = mainGroup.append("g").attr("class", "markers");

    mainGroupRef.current = mainGroup;
    countriesGroupRef.current = countriesGroup;
    markersGroupRef.current = markersGroup;

    const defaultScale = width / 5.5;
    const projection = d3.geoNaturalEarth1()
      .scale(defaultScale)
      .translate([width / 2, height / 2]);

    projectionRef.current = projection;

    const path = d3.geoPath().projection(projection);
    const topojson = (window as any).topojson;
    if (!topojson) return;

    const countries = topojson.feature(worldData, worldData.objects.countries);
    countriesRef.current = countries;

    if (isDotMap) {
      // DOT MAP: Draw dots for land areas
      const dots = generateDotGrid(countries, projection, 6);

      countriesGroup.selectAll("circle.land-dot")
        .data(dots)
        .enter()
        .append("circle")
        .attr("class", "land-dot")
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", 1.5)
        .attr("fill", theme.colors.mapStroke)
        .attr("opacity", 0.6);

    } else {
      // LINE MAP: Draw countries as line outlines
      countriesGroup.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", "transparent")
        .attr("stroke", theme.colors.mapStroke)
        .attr("stroke-width", 0.8)
        .attr("class", "country-path")
        .attr("data-id", (d: any) => d.id);
    }

    // Draw markers for blog locations
    blogs.forEach(blog => {
      const [lng, lat] = blog.coordinates;
      const pos = projection([lng, lat]);

      if (pos) {
        if (isDotMap) {
          // Larger, glowing marker for dot map
          markersGroup.append("circle")
            .attr("cx", pos[0])
            .attr("cy", pos[1])
            .attr("r", 6)
            .attr("fill", theme.colors.accent)
            .attr("opacity", 0.3)
            .attr("class", `marker-glow marker-glow-${blog.id}`);
        }

        markersGroup.append("circle")
          .attr("cx", pos[0])
          .attr("cy", pos[1])
          .attr("r", isDotMap ? 4 : 3)
          .attr("fill", isDotMap ? theme.colors.accent : theme.colors.textPrimary)
          .attr("class", `marker marker-${blog.id}`)
          .style("transition", "all 0.3s ease");
      }
    });

  }, [worldData, theme, blogs, isDotMap]);

  // Handle zoom animations separately
  useEffect(() => {
    if (!mainGroupRef.current || !countriesGroupRef.current || !markersGroupRef.current || !projectionRef.current || !countriesRef.current) return;

    const mainGroup = mainGroupRef.current;
    const countriesGroup = countriesGroupRef.current;
    const markersGroup = markersGroupRef.current;
    const projection = projectionRef.current;
    const countries = countriesRef.current;
    const width = mapContainerRef.current?.clientWidth || 800;
    const height = mapContainerRef.current?.clientHeight || 600;

    if (activeBlog) {
      const [lng, lat] = activeBlog.coordinates;
      const pos = projection([lng, lat]);

      if (pos) {
        const zoomScale = 1.5;
        const translateX = width / 2 - pos[0] * zoomScale;
        const translateY = height / 2 - pos[1] * zoomScale;

        // Zoom in with smooth animation
        mainGroup.transition()
          .duration(800)
          .ease(d3.easeCubicInOut)
          .attr("transform", `translate(${translateX}, ${translateY}) scale(${zoomScale})`);

        if (!isDotMap) {
          // Fill the country containing this point (line map only)
          const point: [number, number] = [lng, lat];
          countries.features.forEach((feature: any) => {
            if (d3.geoContains(feature, point)) {
              countriesGroup.select(`path[data-id="${feature.id}"]`)
                .transition()
                .duration(600)
                .delay(200)
                .ease(d3.easeQuadOut)
                .attr("fill", theme.colors.mapFill)
                .attr("fill-opacity", 0.4);
            }
          });
        }

        // Highlight the marker
        markersGroup.select(`.marker-${activeBlog.id}`)
          .transition()
          .duration(400)
          .attr("r", isDotMap ? 8 : 6)
          .attr("fill", theme.colors.accent);

        if (isDotMap) {
          markersGroup.select(`.marker-glow-${activeBlog.id}`)
            .transition()
            .duration(400)
            .attr("r", 16)
            .attr("opacity", 0.5);
        }
      }
    } else {
      // ZOOM OUT - smooth return to original state
      mainGroup.transition()
        .duration(800)
        .ease(d3.easeCubicInOut)
        .attr("transform", "translate(0, 0) scale(1)");

      if (!isDotMap) {
        // Fade out all country fills (line map only)
        countriesGroup.selectAll("path")
          .transition()
          .duration(600)
          .ease(d3.easeQuadOut)
          .attr("fill", "transparent")
          .attr("fill-opacity", 0);
      }

      // Reset all markers
      markersGroup.selectAll(".marker")
        .transition()
        .duration(400)
        .attr("r", isDotMap ? 4 : 3)
        .attr("fill", isDotMap ? theme.colors.accent : theme.colors.textPrimary);

      if (isDotMap) {
        markersGroup.selectAll(".marker-glow")
          .transition()
          .duration(400)
          .attr("r", 6)
          .attr("opacity", 0.3);
      }
    }

  }, [activeBlog, theme, isDotMap]);

  return (
    <section
      id={id}
      className="min-h-screen flex flex-col relative overflow-hidden pt-16 transition-colors duration-500"
      style={{ backgroundColor: theme.colors.bgLight }}
    >
      {/* Title - only HERON gets liquid metal effect */}
      <div className="absolute top-24 left-8 lg:left-16 z-20">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter">
          <span style={{ color: theme.colors.textPrimary, opacity: 0.9 }}>PROJECT</span>
          <br />
          <span
            className={isLiquid ? 'liquid-metal-text' : ''}
            style={{ color: isLiquid ? undefined : theme.colors.textPrimary }}
          >
            HERON
          </span>
        </h1>
      </div>

      {/* Map Area */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        ref={mapContainerRef}
      >
        <svg ref={svgRef} className="w-full h-full block" />
      </div>

      {/* Blog cards - with frosted glass for liquid/dotmap theme */}
      <div className="absolute bottom-12 left-8 lg:left-16 z-20 max-w-sm">
        <h3
          className="text-xs font-mono uppercase tracking-widest mb-4"
          style={{ color: theme.colors.textMuted }}
        >
          {lang === 'cn' ? '最新观测' : 'LATEST OBSERVATIONS'}
        </h3>
        <div className="space-y-3">
          {blogs.map(blog => (
            <div
              key={blog.id}
              onMouseEnter={() => setActiveBlog(blog)}
              onMouseLeave={() => setActiveBlog(null)}
              className="group cursor-pointer p-4 transition-all duration-300 hover:scale-105 rounded-lg mb-3"
              style={{
                backgroundColor: theme.colors.cardBg,
                border: theme.colors.cardBorder === 'none' ? 'none' : theme.colors.cardBorder,
                backdropFilter: theme.colors.cardBackdropFilter,
              }}
            >
              <div
                className="text-base font-medium transition-colors"
                style={{ color: theme.colors.cardText }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.cardText}
              >
                {blog.title[lang]}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] font-mono" style={{ color: theme.colors.textMuted }}>{blog.date}</span>
                <span className="text-[10px] font-mono" style={{ color: theme.colors.textMuted }}>{blog.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-4 right-8 font-mono text-[10px] z-10" style={{ color: theme.colors.textMuted }}>
        {activeBlog ? `${activeBlog.coordinates[1].toFixed(2)}°N, ${activeBlog.coordinates[0].toFixed(2)}°E` : 'STANDBY'}
      </div>
    </section>
  );
};

export default HeroSection;