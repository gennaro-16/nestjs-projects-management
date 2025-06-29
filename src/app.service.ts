import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Algerian Project Hub</title>
          <style>
              :root {
                  --primary: #006341; /* Algerian green */
                  --secondary: #FFFFFF; /* White */
                  --accent: #DAA520; /* Gold */
                  --text: #333333;
                  --light-bg: #F5F5F5;
              }
              
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: 0;
                  padding: 0;
                  color: var(--text);
                  background-color: var(--light-bg);
                  line-height: 1.6;
              }
              
              .container {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 2rem;
              }
              
              header {
                  background-color: var(--primary);
                  color: var(--secondary);
                  padding: 1rem 0;
                  text-align: center;
                  border-bottom: 5px solid var(--accent);
              }
              
              .logo {
                  height: 80px;
                  margin-bottom: 1rem;
              }
              
              h1 {
                  margin: 0;
                  font-size: 2.5rem;
              }
              
              .tagline {
                  font-size: 1.2rem;
                  opacity: 0.9;
                  margin-top: 0.5rem;
              }
              
              .content {
                  background-color: var(--secondary);
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  margin-top: 2rem;
              }
              
              .features {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                  gap: 1.5rem;
                  margin-top: 2rem;
              }
              
              .feature-card {
                  background-color: var(--light-bg);
                  padding: 1.5rem;
                  border-radius: 6px;
                  border-left: 4px solid var(--accent);
              }
              
              .api-links {
                  margin-top: 3rem;
              }
              
              .api-link {
                  display: inline-block;
                  background-color: var(--primary);
                  color: var(--secondary);
                  padding: 0.8rem 1.5rem;
                  margin-right: 1rem;
                  border-radius: 4px;
                  text-decoration: none;
                  font-weight: bold;
                  transition: all 0.3s ease;
              }
              
              .api-link:hover {
                  background-color: var(--accent);
                  transform: translateY(-2px);
              }
              
              footer {
                  text-align: center;
                  margin-top: 3rem;
                  padding: 1.5rem;
                  background-color: var(--primary);
                  color: var(--secondary);
              }
              
              .emoji {
                  font-size: 1.5rem;
                  vertical-align: middle;
              }
              
              @media (max-width: 768px) {
                  .container {
                      padding: 1rem;
                  }
                  
                  h1 {
                      font-size: 2rem;
                  }
                  
                  .api-links {
                      display: flex;
                      flex-direction: column;
                      gap: 1rem;
                  }
                  
                  .api-link {
                      margin-right: 0;
                  }
              }
          </style>
      </head>
      <body>
          <header>
              <div class="container">
                  <!-- Replace with your actual logo path -->
                  <img src="https://via.placeholder.com/80x80?text=AP+Logo" alt="Algerian Project Hub Logo" class="logo">
                  <h1>Algerian Project Hub</h1>
                  <p class="tagline">Connecting innovation with opportunity</p>
              </div>
          </header>
          
          <main class="container">
              <div class="content">
                  <h2><span class="emoji"></span> Welcome to the Algerian Project Platform!</h2>
                  <p>A hub for entrepreneurs, incubators, and investors to collaborate and grow.</p>
                  
                  <div class="features">
                      <div class="feature-card">
                          <h3>Project Registration</h3>
                          <p>Register and manage your innovative projects with ease.</p>
                      </div>
                      <div class="feature-card">
                          <h3>Incubator Matchmaking</h3>
                          <p>Find the perfect incubator to nurture your project.</p>
                      </div>
                      <div class="feature-card">
                          <h3>Funding Opportunities</h3>
                          <p>Access various funding sources for your venture.</p>
                      </div>
                      <div class="feature-card">
                          <h3>Mentor Network</h3>
                          <p>Connect with experienced mentors across Algeria.</p>
                      </div>
                  </div>
                  
                  <div class="api-links">
                      <h3>API Endpoints:</h3>
                      <a href="/api/docs" class="api-link">API Documentation</a>
                      <a href="/api/projects" class="api-link">Projects Endpoint</a>
                      <a href="/api/incubators" class="api-link">Incubators Endpoint</a>
                      <a href="/api/investors" class="api-link">Investors Endpoint</a>
                  </div>
              </div>
          </main>
          
          <footer>
              <div class="container">
                  <p>© 2023 Algerian Project Hub <span class="emoji"></span></p>
                  <p>Contact: support@projectalgeria.dz</p>
              </div>
          </footer>
      </body>
      </html>
    `;
  }

  getPlatformInfo(): object {
    return {
      name: 'Algerian Project Hub',
      description: 'This platform connects projects with incubators, mentors, and funding opportunities to accelerate their growth.',
      features: [
        'Project registration & management',
        'Matchmaking with incubators',
        'Funding applications',
        'Networking with investors & mentors',
      ],
      country: '🇩🇿 Algeria',
      contact: 'support@projectalgeria.dz',
    };
  }
}