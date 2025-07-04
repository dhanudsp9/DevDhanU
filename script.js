// Hardware 101 Hero Section Animation Script

class HardwareAnimation {
    constructor() {
        this.isInitialized = false;
        this.animationFrameId = null;
        this.resizeTimeout = null;
        
        // Animation state
        this.time = 0;
        this.deltaTime = 0;
        this.lastTime = 0;
        
        // Canvas contexts
        this.waveformCanvas = null;
        this.waveformCtx = null;
        this.particleCanvas = null;
        this.particleCtx = null;
        
        // Animation data
        this.particles = [];
        this.waveforms = [];
        this.circuitTraces = [];
        this.electricalSymbols = [];
        this.logicGates = [];
        
        // Performance settings
        this.maxParticles = window.innerWidth < 768 ? 20 : 40;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.setupCanvases();
        this.createCircuitTraces();
        this.createElectricalSymbols();
        this.createLogicGates();
        this.initWaveforms();
        this.initParticles();
        
        this.bindEvents();
        this.startAnimation();
        
        this.isInitialized = true;
        
        // Remove loading state
        setTimeout(() => {
            document.querySelector('.hero-section').classList.add('loaded');
        }, 100);
    }
    
    setupCanvases() {
        // Waveform canvas
        this.waveformCanvas = document.querySelector('.waveform-canvas');
        this.waveformCtx = this.waveformCanvas.getContext('2d');
        
        // Particle canvas
        this.particleCanvas = document.querySelector('.particle-canvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
        
        this.resizeCanvases();
    }
    
    resizeCanvases() {
        const rect = document.querySelector('.hero-section').getBoundingClientRect();
        
        // Set canvas sizes
        [this.waveformCanvas, this.particleCanvas].forEach(canvas => {
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            
            const ctx = canvas.getContext('2d');
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        });
    }
    
    createCircuitTraces() {
        const svg = document.querySelector('.circuit-traces');
        const viewBox = { width: 1920, height: 1080 };
        
        // Generate random circuit trace paths
        const traceCount = window.innerWidth < 768 ? 8 : 15;
        
        for (let i = 0; i < traceCount; i++) {
            this.createSingleTrace(svg, viewBox, i);
        }
    }
    
    createSingleTrace(svg, viewBox, index) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathData = this.generateTracePath(viewBox);
        
        path.setAttribute('d', pathData);
        path.setAttribute('class', 'circuit-trace');
        path.style.animationDelay = `${index * 0.5}s`;
        
        svg.appendChild(path);
        
        // Add connection nodes
        this.addTraceNodes(svg, pathData, index);
    }
    
    generateTracePath(viewBox) {
        const startX = Math.random() * viewBox.width;
        const startY = Math.random() * viewBox.height;
        
        let pathData = `M ${startX} ${startY}`;
        let currentX = startX;
        let currentY = startY;
        
        const segmentCount = 3 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < segmentCount; i++) {
            const direction = Math.random() < 0.5 ? 'H' : 'V'; // Horizontal or Vertical
            
            if (direction === 'H') {
                currentX += (Math.random() - 0.5) * 400;
                currentX = Math.max(0, Math.min(viewBox.width, currentX));
                pathData += ` H ${currentX}`;
            } else {
                currentY += (Math.random() - 0.5) * 300;
                currentY = Math.max(0, Math.min(viewBox.height, currentY));
                pathData += ` V ${currentY}`;
            }
        }
        
        return pathData;
    }
    
    addTraceNodes(svg, pathData, traceIndex) {
        // Extract coordinates from path data for node placement
        const coords = pathData.match(/[\d.]+/g);
        if (!coords || coords.length < 4) return;
        
        for (let i = 0; i < coords.length; i += 2) {
            if (Math.random() < 0.3) { // 30% chance for a node
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', coords[i]);
                circle.setAttribute('cy', coords[i + 1]);
                circle.setAttribute('r', '3');
                circle.setAttribute('class', 'circuit-node');
                circle.style.animationDelay = `${traceIndex * 0.3 + i * 0.1}s`;
                
                svg.appendChild(circle);
            }
        }
    }
    
    createElectricalSymbols() {
        const container = document.querySelector('.symbol-cloud');
        const symbols = ['⟟', '⟘', '∿', '⟜', '⟝', '⟞', '⊞', '⊟', '⊠', '◊', '◈', '⬟', '⬢'];
        const symbolCount = window.innerWidth < 768 ? 12 : 20;
        
        for (let i = 0; i < symbolCount; i++) {
            const symbol = document.createElement('div');
            symbol.className = 'electrical-symbol';
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.left = Math.random() * 100 + '%';
            symbol.style.top = Math.random() * 100 + '%';
            symbol.style.animationDelay = Math.random() * 12 + 's';
            symbol.style.animationDuration = (8 + Math.random() * 8) + 's';
            
            container.appendChild(symbol);
            this.electricalSymbols.push(symbol);
        }
    }
    
    createLogicGates() {
        const container = document.querySelector('.logic-gates');
        const gates = ['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'];
        const gateCount = window.innerWidth < 768 ? 6 : 10;
        
        for (let i = 0; i < gateCount; i++) {
            const gate = document.createElement('div');
            gate.className = 'logic-gate';
            gate.textContent = gates[Math.floor(Math.random() * gates.length)];
            gate.style.left = Math.random() * 100 + '%';
            gate.style.top = Math.random() * 100 + '%';
            gate.style.animationDelay = Math.random() * 10 + 's';
            gate.style.animationDuration = (6 + Math.random() * 8) + 's';
            
            container.appendChild(gate);
            this.logicGates.push(gate);
        }
    }
    
    initWaveforms() {
        const canvas = this.waveformCanvas;
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        
        // Create multiple waveform types
        this.waveforms = [
            {
                type: 'sine',
                amplitude: 30,
                frequency: 0.02,
                phase: 0,
                speed: 1,
                y: height * 0.3,
                color: 'rgba(255, 255, 255, 0.4)'
            },
            {
                type: 'square',
                amplitude: 20,
                frequency: 0.015,
                phase: Math.PI,
                speed: 0.8,
                y: height * 0.7,
                color: 'rgba(0, 255, 170, 0.3)'
            },
            {
                type: 'sawtooth',
                amplitude: 25,
                frequency: 0.025,
                phase: Math.PI / 2,
                speed: 1.2,
                y: height * 0.5,
                color: 'rgba(255, 255, 255, 0.2)'
            }
        ];
    }
    
    initParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        const canvas = this.particleCanvas;
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            life: Math.random() * 300 + 100,
            maxLife: 400,
            trail: []
        };
    }
    
    updateParticles() {
        const canvas = this.particleCanvas;
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Add to trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 8) {
                particle.trail.shift();
            }
            
            // Update life
            particle.life--;
            particle.opacity = particle.life / particle.maxLife;
            
            // Boundary wrapping
            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;
            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles[i] = this.createParticle();
            }
        }
    }
    
    drawWaveforms() {
        const ctx = this.waveformCtx;
        const canvas = this.waveformCanvas;
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, width, height);
        
        this.waveforms.forEach(waveform => {
            ctx.strokeStyle = waveform.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            const step = 4;
            for (let x = 0; x < width; x += step) {
                let y;
                const phase = waveform.phase + x * waveform.frequency + this.time * waveform.speed * 0.001;
                
                switch (waveform.type) {
                    case 'sine':
                        y = waveform.y + Math.sin(phase) * waveform.amplitude;
                        break;
                    case 'square':
                        y = waveform.y + (Math.sin(phase) > 0 ? 1 : -1) * waveform.amplitude;
                        break;
                    case 'sawtooth':
                        y = waveform.y + (2 * (phase % (2 * Math.PI)) / (2 * Math.PI) - 1) * waveform.amplitude;
                        break;
                }
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        });
    }
    
    drawParticles() {
        const ctx = this.particleCtx;
        const canvas = this.particleCanvas;
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        
        ctx.clearRect(0, 0, width, height);
        
        this.particles.forEach(particle => {
            // Draw trail
            if (particle.trail.length > 1) {
                ctx.strokeStyle = `rgba(0, 255, 170, ${particle.opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                
                particle.trail.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                
                ctx.stroke();
            }
            
            // Draw particle
            ctx.fillStyle = `rgba(0, 255, 170, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow effect
            ctx.shadowColor = 'rgba(0, 255, 170, 0.5)';
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }
    
    animate(currentTime) {
        if (!this.lastTime) this.lastTime = currentTime;
        this.deltaTime = currentTime - this.lastTime;
        
        // Throttle animation to target FPS
        if (this.deltaTime >= this.frameInterval) {
            this.time = currentTime;
            
            this.updateParticles();
            this.drawWaveforms();
            this.drawParticles();
            
            this.lastTime = currentTime - (this.deltaTime % this.frameInterval);
        }
        
        this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
    }
    
    startAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.animate(0);
    }
    
    stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.resizeCanvases();
            this.initWaveforms();
            
            // Adjust particle count for mobile
            const newMaxParticles = window.innerWidth < 768 ? 20 : 40;
            if (newMaxParticles !== this.maxParticles) {
                this.maxParticles = newMaxParticles;
                this.initParticles();
            }
        }, 250);
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            this.stopAnimation();
        } else {
            this.startAnimation();
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Pause animations on reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            this.stopAnimation();
        }
        
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                this.stopAnimation();
            } else {
                this.startAnimation();
            }
        });
    }
    
    destroy() {
        this.stopAnimation();
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state initially
    document.querySelector('.hero-section').classList.add('loading');
    
    // Initialize animation system
    window.hardwareAnimation = new HardwareAnimation();
});

// Add button interaction
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            ctaButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = '';
            }, 150);
            
            // Here you would typically navigate to the learning platform
            console.log('Starting learning journey...');
        });
    }
});

// Performance monitoring (development helper)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    let frameCount = 0;
    let lastFPSUpdate = 0;
    
    function monitorFPS() {
        frameCount++;
        const now = performance.now();
        
        if (now - lastFPSUpdate >= 1000) {
            console.log(`FPS: ${frameCount}`);
            frameCount = 0;
            lastFPSUpdate = now;
        }
        
        requestAnimationFrame(monitorFPS);
    }
    
    // Uncomment to enable FPS monitoring
    // monitorFPS();
}