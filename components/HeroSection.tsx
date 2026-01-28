import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { getStaticData } from '../services/dataGateway';
import { Lang, Blog } from '../types';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  lang: Lang;
  id: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ lang, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blogs = getStaticData<Blog>('blogs');
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    // Map Projection
    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.6]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Load World GeoJSON (Simplified simulation for this demo code)
    // Using a simple grid or abstract shapes if GeoJSON fetch fails or isn't available would be safer
    // But let's try to draw a simple abstract world map using coordinates
    
    // Draw Land (Abstract)
    // Since we don't have a geojson file, we will render the points primarily.
    // Ideally we fetch: https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson
    
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(data => {
        svg.append("g")
          .selectAll("path")
          .data(data.features)
          .join("path")
          .attr("fill", "none")
          .attr("stroke", "#e5e7eb") // Very light gray outline
          .attr("stroke-width", 0.5)
          .attr("d", pathGenerator as any);

        // Draw City Points
        blogs.forEach(blog => {
            const [long, lat] = blog.coordinates;
            const pos = projection([long, lat]);
            if (pos) {
                svg.append("rect")
                   .attr("x", pos[0] - 2)
                   .attr("y", pos[1] - 2)
                   .attr("width", 4)
                   .attr("height", 4)
                   .attr("fill", "none")
                   .attr("stroke", "#111")
                   .attr("stroke-width", 1);
            }
        });
        
        // Flight Path Logic
        if (activeBlog) {
            const startCoords: [number, number] = [0, 20]; // Abstract 'Home' center
            const endCoords = activeBlog.coordinates;
            
            const source = projection(startCoords);
            const target = projection(endCoords);

            if (source && target) {
                 const link = {type: "LineString", coordinates: [startCoords, endCoords]};
                 
                 // Draw the curve
                 const path = svg.append("path")
                    .datum(link)
                    .attr("d", function(d) {
                        // Create a curve
                        const dx = target[0] - source[0],
                              dy = target[1] - source[1],
                              dr = Math.sqrt(dx * dx + dy * dy);
                        return "M" + source[0] + "," + source[1] + "A" + dr + "," + dr + " 0 0,1 " + target[0] + "," + target[1];
                    })
                    .attr("fill", "none")
                    .attr("stroke", "url(#metallicGradient)")
                    .attr("stroke-width", 1.5)
                    .style("opacity", 0);

                // Define Gradient in SVG
                const defs = svg.append("defs");
                const gradient = defs.append("linearGradient")
                    .attr("id", "metallicGradient")
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "0%");
                
                gradient.append("stop").attr("offset", "0%").attr("stop-color", "#262526");
                gradient.append("stop").attr("offset", "50%").attr("stop-color", "#2535bc");
                gradient.append("stop").attr("offset", "100%").attr("stop-color", "#6da0d7");

                // Animate
                const totalLength = (path.node() as SVGPathElement).getTotalLength();
                
                path
                  .attr("stroke-dasharray", totalLength + " " + totalLength)
                  .attr("stroke-dashoffset", totalLength)
                  .style("opacity", 1)
                  .transition()
                  .duration(1500)
                  .ease(d3.easeCubicOut)
                  .attr("stroke-dashoffset", 0);
            }
        }

      })
      .catch(err => {
          console.error("Failed to load map data", err);
          // Fallback visual if map fails
          svg.append("text")
             .attr("x", width/2)
             .attr("y", height/2)
             .attr("text-anchor", "middle")
             .attr("fill", "#ccc")
             .text("MAP DATA UNAVIAILABLE");
      });

  }, [activeBlog, blogs]); 
  // Note: Resizing isn't handled here for brevity, but in production use ResizeObserver.

  return (
    <section id={id} className="min-h-screen flex flex-col lg:flex-row border-b border-gray-100">
      {/* Info Area (Left on Desktop, Top on Mobile) */}
      <div className="w-full lg:w-1/4 p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-white z-10">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-2">
          PROJECT <br/> <span className="metallic-text">HERON</span>
        </h1>
        <p className="text-sm font-mono text-gray-500 mb-12">
          {lang === 'cn' ? '连接全球创新者的航线' : 'FLIGHT PATHS FOR INNOVATORS'}
        </p>

        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase text-gray-400 tracking-widest">
            {lang === 'cn' ? '最新观测' : 'LATEST OBSERVATIONS'}
          </h3>
          <ul className="space-y-4">
            {blogs.map(blog => (
              <li 
                key={blog.id}
                onMouseEnter={() => setActiveBlog(blog)}
                className="group cursor-pointer"
              >
                <div className="text-sm font-medium group-hover:text-[#2535bc] transition-colors">
                  {blog.title[lang]}
                </div>
                <div className="mt-1 h-[1px] w-full bg-gray-200 group-hover:bg-[#2535bc] group-hover:h-[2px] transition-all origin-left duration-300"></div>
                <div className="flex justify-between mt-1">
                    <span className="text-[10px] font-mono text-gray-400">{blog.date}</span>
                    <Link to="/demo" className="text-[10px] font-mono text-gray-400 group-hover:text-[#2535bc]">READ -></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Map Area */}
      <div className="w-full lg:w-3/4 h-[40vh] lg:h-auto bg-[#FDFDFD] relative overflow-hidden" ref={containerRef}>
        <svg ref={svgRef} className="w-full h-full block"></svg>
        <div className="absolute bottom-4 right-4 font-mono text-[10px] text-gray-300">
           COORD: {activeBlog ? `${activeBlog.coordinates[1].toFixed(2)}N, ${activeBlog.coordinates[0].toFixed(2)}E` : 'STANDBY'}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;