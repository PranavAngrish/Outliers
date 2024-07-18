import React, { useEffect, useRef } from 'react';

function Footer() {
  const footerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = footer.offsetWidth;
      canvas.height = footer.offsetHeight;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${320 + Math.random() * 20}, 100%, ${70 + Math.random() * 10}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.1) {
          particles.splice(index, 1);
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isOverLink = element.tagName === 'A' || element.closest('a');
      const isOverText = element.tagName === 'P' || element.tagName === 'H3';
      const isInCopyrightSection = element.closest('.copyright-section');

      if (!isOverLink && !isOverText && !isInCopyrightSection) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(x, y));
        }
      }
    };

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
    footer.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      footer.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-black py-12 mt-16 relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Team</a></li>
            </ul>
          </div>
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Safety Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Cancellation Options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">partnerships@outliers.com</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">+1 (123) 456-7890</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">123 Travel Street, Adventure City</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="mt-4 pt-4 text-center copyright-section">
            <p className="text-gray-600">&copy; 2024 The Outliers Co. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;