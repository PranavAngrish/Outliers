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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = `rgba(255, 105, 180, ${Math.random() * 0.5 + 0.5})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.03;
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
        for (let i = 0; i < 2; i++) {
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
    <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 to-black py-16 mt-20 relative">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-pink-500 inline-block pb-2">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">➤</span>Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">➤</span>Team</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-pink-500 inline-block pb-2">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">➤</span>Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">➤</span>Safety Information</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">➤</span>Cancellation Options</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-pink-500 inline-block pb-2">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">✉</span>partnerships@outliers.com</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">☎</span>+1 (123) 456-7890</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition duration-300 flex items-center"><span className="mr-2">📍</span>123 Travel Street, Adventure City</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="mt-8 pt-8 text-center copyright-section">
            <p className="text-gray-400">&copy; 2024 The Outliers Co. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;