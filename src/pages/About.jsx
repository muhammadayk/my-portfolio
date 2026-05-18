import { Link } from "react-router-dom";
import '../index.css';

export default function About() {
  return (
    <>
      <div className="about-page">
      <div className="about-container">

      
        <section className="about-hero">
          <p className="section-tag">About Me</p>

        <h1 className="about-page-title">
         Designer, <span>Web3 Creator</span>,
         <br />
         and Community Builder.
        </h1>

          <p className="about-page-sub">
            I help brands and blockchain projects create stronger visual identity,
            better audience connection, and more engaging digital presence.
          </p>
        </section>

        <section className="about-grid">

          <div className="about-block">
            <h3>Creative Design</h3>

            <p>
              I specialize in brand identity, social media design,
              campaign visuals, and creative direction focused on
              modern internet culture and attention-driven design.
            </p>
          </div>

          <div className="about-block">
            <h3>Web3 Experience</h3>

            <p>
              Active within the blockchain ecosystem through ambassador
              roles, creator collaborations, moderation, ecosystem growth,
              and sponsored campaign work.
            </p>
          </div>

          <div className="about-block">
            <h3>Content & Partnerships</h3>

            <p>
              I work with projects on educational content, promotional
              campaigns, creator partnerships, and community engagement
              strategies across social platforms.
            </p>
          </div>

          <div className="about-block">
            <h3>What I Can Offer</h3>

            <p>
              From visuals to storytelling and audience positioning,
              I help projects look sharper, communicate better,
              and connect deeper with their communities.
            </p>
          </div>

        </section>

        <section className="about-cta-section">
          <h2>
            Looking for a designer,
            creator, or Web3 collaborator?
          </h2>

          <button className="btn-primary">
            Let’s work together →
          </button>
        </section>

      </div>
      </div>
    </>
  );
}