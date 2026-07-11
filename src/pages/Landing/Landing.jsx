import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe, FaWindows, FaTasks, FaBook, FaBriefcase, FaSkullCrossbones, FaGamepad, FaTrophy } from 'react-icons/fa';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-grid-bg"></div>
      <div className="landing-vignette"></div>

      <div className="landing-content-layer">
        
        {/* 1. Hero Section */}
        <section className="landing-section hero-section">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ width: '100%' }}
          >
            <h1 className="hero-title">PrepQuest</h1>
            <p className="hero-subtitle">
              Turn your career grind into an epic 8-bit RPG. Master skills, build projects, and defeat interview bosses to secure your ultimate loot: The Offer Letter.
            </p>
          </motion.div>
        </section>

        {/* 2. What is PrepQuest? (Left Text, Right Visual) */}
        <section className="landing-section">
          <motion.div 
            className="split-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="split-text">
              <h2 className="section-title">Turn the Grind into a Game</h2>
              <p className="section-text">
                Preparing for job placements and building a portfolio can feel like an endless grind. PrepQuest was built to change that by transforming your real-world tasks into epic quests.
                <br/><br/>
                Every algorithm you learn and every project you complete earns you XP. Level up your developer profile and watch your productivity soar.
              </p>
            </div>
            <div className="split-visual">
              <div className="visual-box">
                <FaGamepad />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Who is it for? (Right Text, Left Visual) */}
        <section className="landing-section">
          <motion.div 
            className="split-section reverse"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="split-text">
              <h2 className="section-title">For the Ambitious Developer</h2>
              <p className="section-text">
                Whether you're a Computer Science student hunting for your very first internship, a bootcamp graduate building a stunning portfolio, or a senior engineer trying to master a new tech stack.
                <br/><br/>
                PrepQuest provides the structure, motivation, and tracking you need to stay consistent and achieve your goals.
              </p>
            </div>
            <div className="split-visual">
              <div className="visual-box" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', boxShadow: '8px 8px 0px rgba(0,0,0,0.5), 0 0 30px rgba(245, 158, 11, 0.2) inset' }}>
                <FaTrophy />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. How to Use It */}
        <section className="landing-section">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <motion.h2 variants={fadeInUp} className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Your Journey Begins Here</motion.h2>
            <motion.p variants={fadeInUp} className="section-text" style={{ textAlign: 'center', margin: '0 auto 3rem auto', maxWidth: '700px' }}>
              Four core mechanics designed to keep you on track and motivated.
            </motion.p>
            
            <div className="steps-grid">
              <motion.div variants={fadeInUp} className="step-card">
                <FaTasks className="step-icon" />
                <h3 className="step-title">Accept Quests</h3>
                <p className="step-desc">Complete daily coding tasks or create custom quests tailored specifically for your goals.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="step-card">
                <FaBook className="step-icon" />
                <h3 className="step-title">Gain Skills</h3>
                <p className="step-desc">Log your learning hours to organically level up your programming languages and tools.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="step-card">
                <FaBriefcase className="step-icon" />
                <h3 className="step-title">Build Projects</h3>
                <p className="step-desc">Track your portfolio projects from planning to 100% completion for massive XP rewards.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="step-card">
                <FaSkullCrossbones className="step-icon" />
                <h3 className="step-title">Defeat Bosses</h3>
                <p className="step-desc">Enter the Placement arena, track your job applications as boss fights, and land the offer!</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 5. Call to Action */}
        <section className="cta-section">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="hero-title" style={{ fontSize: '3rem', textShadow: 'none' }}>Start Your Quest</h2>
            <div className="landing-actions" style={{ marginTop: '3rem' }}>
              <button onClick={() => navigate('/dashboard')} className="landing-btn landing-btn-web">
                <FaGlobe style={{ marginRight: '12px' }} />
                Launch Web App
              </button>
              
              <a href="https://github.com/Leander-Antony/MineQuest/releases/latest" target="_blank" rel="noreferrer" className="landing-btn landing-btn-desktop">
                <FaWindows style={{ marginRight: '12px' }} />
                Get for Windows
              </a>
            </div>
          </motion.div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} PrepQuest. Built for the grind. Level up your career.</p>
        </footer>
      </div>
    </div>
  );
}
