"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import "./style.css";

const PinterestGrid = ({
  items = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1616262373426-18bfa28bafab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Dragon sculpture on building",
      title: "Dragon on building",
      description:
        "Architectural dragon sculpture mounted on a building facade",
      author: "Alex Chen",
    },
    {
      id: "2",
      src: "https://plus.unsplash.com/premium_photo-1675620963970-41055a7d6cfc?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Ocean water waves",
      title: "Ocean water",
      description:
        "Clear blue ocean water with gentle waves and natural movement",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1542128047-9b51cb9b931d?q=80&w=1499&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Vintage camera rolls",
      title: "Camera rolls",
      description:
        "Collection of vintage film camera rolls and photography equipment",
      author: "Sarah Johnson",
    },

    {
      id: "4",
      src: "https://plus.unsplash.com/premium_vector-1746288322059-bddfbcf3a8f7?q=80&w=740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Llama in desert landscape",
      title: "Llama in the Desert",
      description:
        "Cute llama standing in a desert environment with sand dunes",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1457195740896-7f345efef228?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Ocean waves crashing",
      title: "Ocean Waves",
      description:
        "Powerful ocean waves crashing with white foam and blue water",
    },
    {
      id: "6",
      src: "https://plus.unsplash.com/premium_photo-1683746563185-2567c3ca093a?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Hotdog with sauce and toppings",
      title: "Hotdog with sauce",
      description: "Delicious hotdog served with sauce and various toppings",
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1492362764835-5733512e3ddc?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Girl smoking cigarette",
      title: "Smoking girl",
      description:
        "Portrait of a girl smoking a cigarette in artistic lighting",
      author: "Marcus Rodriguez",
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1595401735913-4ca17c66e755?q=80&w=675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Praktica vintage camera",
      title: "parktica camera",
      description: "Classic Praktica vintage film camera with retro design",
    },
    {
      id: "9",
      src: "https://plus.unsplash.com/premium_vector-1746416995848-7fb8a141686f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Spider artwork illustration",
      title: "Spider Art",
      description:
        "Artistic illustration or design featuring spider motifs and patterns",
    },
    {
      id: "10",
      src: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Spider-man superhero",
      title: "Spider-man",
      description: "Spider-man superhero character in action pose or costume",
    },
  ],
  columns = 4,
  gap = 16,
  onItemClick,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const distributeItems = () => {
    const columnHeights = new Array(columns).fill(0);
    const columnItems = new Array(columns)
      .fill(null)
      .map(() => []);

    items.forEach((item) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columnItems[shortestColumnIndex].push(item);
      columnHeights[shortestColumnIndex] +=
        ((item.height || 300) / (item.width || 400)) * 400 + 100;
    });

    return columnItems;
  };

  const columnItems = distributeItems();

  return (
    <div className="pinterest-wrapper">
      <motion.div
        className="pinterest-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <div className="pinterest-grid" style={{ gap: `${gap}px` }}>
          {columnItems.map((column, columnIndex) => (
            <div key={columnIndex} className="pinterest-column">
              {column.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="pinterest-item"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => onItemClick?.(item)}>
                  <div className="pinterest-card">
                    {imageErrors.has(item.id) ? (
                      <div
                        className="pinterest-error-placeholder"
                        style={{ height: `${item.height || 300}px` }}>
                        <div className="pinterest-error-content">
                          <div className="pinterest-error-icon">🖼️</div>
                          <p className="pinterest-error-text">
                            Image not available
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.alt || "Pinterest image"}
                        width={item.width || 400}
                        height={item.height || 300}
                        className="pinterest-image"
                        onError={() => {
                          setImageErrors((prev) => new Set(prev).add(item.id));
                        }}
                        unoptimized={true}
                      />
                    )}

                    <div
                      className={`pinterest-overlay ${
                        hoveredItem === item.id
                          ? "pinterest-overlay-visible"
                          : ""
                      }`}>
                      <div
                        className={`pinterest-content ${
                          hoveredItem === item.id
                            ? "pinterest-content-visible"
                            : ""
                        }`}>
                        {item.title && (
                          <h3 className="pinterest-title">{item.title}</h3>
                        )}
                        {item.description && (
                          <p className="pinterest-description">
                            {item.description}
                          </p>
                        )}
                        {item.author && (
                          <p className="pinterest-author">by {item.author}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PinterestGrid;
