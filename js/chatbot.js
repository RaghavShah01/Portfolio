// ============================================
// API Configuration
// ============================================
// IMPORTANT: Replace with your Cloudflare Worker URL after deployment
// Example: 'https://portfolio-ai-proxy.your-subdomain.workers.dev'
const API_PROXY_URL = 'https://portfolio-ai-proxy.raghavshah900.workers.dev';
const MODEL = 'deepseek/deepseek-r1-0528:free';

// ============================================
// System Prompt with Raghav's Portfolio Data
// ============================================
const SYSTEM_PROMPT = `You are Raghav Shah's AI portfolio assistant. You help visitors learn about Raghav's skills, experience, projects, and background. Be friendly, professional, and concise. Always respond in first person as if you are representing Raghav.

## ABOUT RAGHAV SHAH
- Machine Learning Engineer based in Chicago, IL
- Email: r.shah.aiengineer@gmail.com
- Phone: +1 (872) 258-3155
- LinkedIn: linkedin.com/in/raghav-shah01
- GitHub: github.com/RaghavShah01

## SUMMARY
ML Engineer with 2+ years building and deploying computer vision and MLOps systems on AWS at production scale. Shipped 5 transformer-based vision models into production and built CI/CD infrastructure used by 15+ engineers. Expert in PyTorch, AWS SageMaker, Kubernetes, Terraform, and Docker. Open to full-time AI/ML Engineer, MLOps Engineer, and Data Scientist roles.

## EDUCATION
1. Illinois Institute of Technology (Aug 2024 - May 2026)
   - Master's in Artificial Intelligence, GPA: 3.88/4.0
   - Received merit scholarship
   - Coursework: Deep Learning, Distributed Systems, Algorithms, Computer Vision, NLP

2. Chandigarh University (Sept 2020 - May 2024)
   - Bachelor's in Computer Science
   - Vice President of IEEE Student Club (2023)

## WORK EXPERIENCE

### CCC Intelligent Solutions | Data Science Engineer (May 2025 - Present) | Chicago, IL
- Architected multi-model ensemble pipelines for auto insurance claims AI; migrated computer vision inference from GPU instances to AWS Graviton (ARM) instances, reducing inference costs at equivalent production throughput
- Owned end-to-end release of 5 transformer-based computer vision models into production — establishing CI/CD pipelines, Docker containerization, and image versioning workflows adopted by 15+ engineers as the standard for all new AI model deployments
- Designed and deployed 5+ production AI services on AWS (SageMaker, Step Functions, Lambda, CloudWatch) using Terraform, packaging each release with Flask and Docker
- Developed an LLM-assisted post-deployment validation framework using AWS Bedrock and LangChain to automate ML service validation across 10 SageMaker endpoints — eliminating manual validation steps across each model release cycle
- Built a custom data annotation tool powered by SAM-2 for semi-automatic segmentation of vehicle damage images — delivering 2x faster labeling versus manual workflows; delivered a FiftyOne POC for dataset visualization and embedding-space analysis
- Architected the Ensemble Wizard simulation framework using Kubernetes, Helm, Docker, and ECR to run client-scale simulations across 10M+ insurance claims; implemented FinOps cost-tracking tags across all SageMaker Terraform configs

### Edifecs Technologies | Associate Data Engineer (Jun 2023 - Aug 2024) | Remote
- Managed cloud deployment of 15+ Health Insurance Enrollment Software suites across AWS (EC2, S3, Lambda, RDS, Step Functions), processing 1M+ EDI 834 enrollment transactions with full HIPAA compliance
- Optimized enrollment software for 10+ U.S. healthcare clients, cutting transaction processing time significantly — improving throughput and scalability for large-scale payer organizations

### Celebel Technologies | Data Science Intern (Jun 2023 - Aug 2024) | Remote
- Developed an NLP text classification pipeline using Scikit-learn and Pandas to analyze customer support tickets — achieving 94% classification accuracy across multiple client engagements

## PROJECTS

### LinkedIn Outreach Tracker (2025)
- Built a full-stack job search automation system: Chrome extension captures outreach events, serverless AWS backend (Lambda + API Gateway + DynamoDB) stores records, and a React dashboard on GitHub Pages visualizes funnel metrics in real time
- Tech: Chrome Extension, AWS Lambda, API Gateway, DynamoDB, React

### MedCompare - AI-Driven Medication Evaluation (Apr 2025)
- Engineered a benchmarking engine evaluating AI-generated drug data across 800+ medications using fuzzy string matching (RapidFuzz/fuzzywuzzy) and semantic similarity — achieving 87% accuracy and cutting manual validation time significantly
- Processed JSON records with FHIR-compliant output across GPT, Gemini, Llama, and DeepSeek models
- Tech: Python, LLMs (GPT, Gemini, Llama, DeepSeek), RapidFuzz, Pandas, FHIR

### Hybrid AgileGen - AI-Driven Software Planning (Nov 2024)
- Designed a multi-agent planning system combining Scrum and Waterfall methodologies — automatically generating sprint plans, user stories, risk assessments, and architecture docs across 5 workflow phases from a single project brief
- Tech: LangChain, LangGraph, AutoGen, OpenAI, Gemini

### CTA Data Analysis - Serverless ETL Pipeline for Chicago Transit (Jan 2026)
- Built a serverless ETL pipeline on AWS (S3, Lambda, Redshift) integrating 20 years of CTA ridership, crime, and weather data
- Conducted spatial crime hotspot analysis using GeoPandas and Tableau, identifying seasonal crime patterns

### Invisible Lines - Chicago Community Network Analysis (Dec 2024)
- Quantified income spatial autocorrelation and crime spillover effects across 4 Chicago community areas using spatial econometrics and NetworkX — analyzing 81,000+ crime records spanning 2001–2024
- Identified transit accessibility disparity using inverse distance weighting analysis across 77+ block groups

## TECHNICAL SKILLS
- ML & AI: PyTorch, TorchScript, Scikit-learn, OpenCV, NumPy, Pandas, Matplotlib, Seaborn, SciPy
- Deep Learning: TensorFlow, Keras, PyTorch, TorchScript, OpenCV, DNN, CNN, RNN (LSTM), SAM-2, FiftyOne
- NLP & Generative AI: NLTK, SpaCy, LangChain, LangGraph, AutoGen, AWS Bedrock, LLMs (GPT, Gemini, Llama, DeepSeek)
- Data Analysis & Visualization: Pandas, NumPy, SciPy, Matplotlib, Seaborn, R, Tableau, GeoPandas, EDA
- Cloud & MLOps: AWS SageMaker (async inference, autoscaling, endpoint management), ECR, ECS, EKS, EC2, Lambda, Step Functions, DynamoDB, S3, CloudWatch, Graviton, Docker, Kubernetes, Helm, Terraform, CI/CD, GitHub Actions, Flask, FastAPI
- Programming: Python, C/C++, SQL, R, Java, JavaScript

## PUBLICATION
"Enhancing Machine Learning Model Using Explainable AI" - Springer LNNS, Volume 796, Jan 2024
- Integrated LIME and SHAP techniques
- Achieved 98% accuracy on Hotel Review Management Model

## ACHIEVEMENTS
- Merit scholarship from Illinois Institute of Technology (2024)
- Vice President, IEEE Student Club at Chandigarh University (2023)

## INSTRUCTIONS
- Keep responses concise but informative (2-4 paragraphs max)
- Use bullet points for lists
- Highlight key numbers and achievements
- If asked about something not in the data, politely say you don't have that information
- Be enthusiastic about Raghav's work and achievements
- For contact inquiries, provide email: r.shah.aiengineer@gmail.com`;

// Conversation history for context
let conversationHistory = [];

// ============================================
// LLM API Functions
// ============================================
async function callLLM(userMessage, isJobFit = false) {
    const systemPrompt = isJobFit ?
        SYSTEM_PROMPT + `\n\n## SPECIAL TASK: JOB FIT ANALYSIS
You are analyzing how well Raghav's skills match a job description.
Provide:
1. An overall match percentage (be realistic, 60-90% for good matches)
2. List of matching skills with brief justifications
3. Relevant projects that demonstrate the required skills
4. Any gaps or areas where Raghav could improve
Format your response clearly with sections.` : SYSTEM_PROMPT;

    conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    // Keep only last 10 messages for context
    if (conversationHistory.length > 10) {
        conversationHistory = conversationHistory.slice(-10);
    }

    try {
        // Call through secure proxy (API key is stored on Cloudflare Worker)
        const response = await fetch(API_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...conversationHistory
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        let assistantMessage = data.choices[0].message.content;

        // Remove <think> tags if present (DeepSeek R1 reasoning)
        assistantMessage = assistantMessage.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        return assistantMessage;
    } catch (error) {
        console.error('LLM API Error:', error);
        return getFallbackResponse(userMessage);
    }
}

// Fallback responses if API fails
function getFallbackResponse(input) {
    const normalizedInput = input.toLowerCase();

    if (normalizedInput.includes('pytorch') || normalizedInput.includes('torch')) {
        return "Raghav has extensive PyTorch experience! At CCC Intelligent Solutions, he developed model inference pipelines for computer vision, reducing inference time by 40%. He also used PyTorch at Celebel Technologies for deep learning projects.";
    }
    if (normalizedInput.includes('aws') || normalizedInput.includes('cloud')) {
        return "Raghav is highly skilled in AWS services including SageMaker, Lambda, S3, EC2, Redshift, Step Functions, and Bedrock. He's deployed computer vision models on SageMaker with Kubernetes and built serverless ETL pipelines.";
    }
    if (normalizedInput.includes('medcompare') || normalizedInput.includes('medication')) {
        return "MedCompare is an AI-Driven Medication Data Evaluation Platform Raghav built. It evaluates AI-generated drug data across 400+ medications using LLMs (OpenAI, Gemini, Llama, DeepSeek), achieving 87% accuracy and reducing validation time by 60%.";
    }
    if (normalizedInput.includes('contact') || normalizedInput.includes('email') || normalizedInput.includes('hire')) {
        return "You can reach Raghav at:\n📧 r.shah.aiengineer@gmail.com\n📱 +1 (872) 258-3155\n💼 linkedin.com/in/raghav-shah01\n💻 github.com/RaghavShah01";
    }

    return "I'm Raghav's AI assistant! I can tell you about his skills (PyTorch, AWS, LLMs), projects (MedCompare, CTA Analysis), work experience, or education. What would you like to know?";
}

// ============================================
// Chat UI Functions
// ============================================
function addMessage(content, isUser = false) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    // Convert markdown-style formatting to HTML
    let formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/- /g, '• ');

    messageDiv.innerHTML = `<div class="message-content">${formattedContent}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `<div class="message-content"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

async function handleUserInput() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, true);
    input.value = '';
    input.disabled = true;
    document.getElementById('chatbot-send').disabled = true;

    addTypingIndicator();

    try {
        const response = await callLLM(message);
        removeTypingIndicator();
        addMessage(response);
    } catch (error) {
        removeTypingIndicator();
        addMessage("Sorry, I encountered an error. Please try again!");
    }

    input.disabled = false;
    document.getElementById('chatbot-send').disabled = false;
    input.focus();
}

// ============================================
// Job Fit Analyzer Functions
// ============================================
async function analyzeJobFit(jobDescription) {
    const prompt = `Analyze how well Raghav's skills and experience match this job description. Provide a match percentage, list matching skills with justifications, and mention relevant projects.

JOB DESCRIPTION:
${jobDescription}`;

    try {
        const response = await callLLM(prompt, true);
        return response;
    } catch (error) {
        console.error('Job Fit Analysis Error:', error);
        return "Sorry, I couldn't analyze the job fit. Please try again.";
    }
}

function displayJobFitResults(analysis) {
    const resultsDiv = document.getElementById('match-results');
    const matchedSkillsDiv = document.getElementById('matched-skills');
    const matchedProjectsDiv = document.getElementById('matched-projects');
    const scoreValue = document.querySelector('.score-value');

    // Extract percentage from response (look for XX% pattern)
    const percentMatch = analysis.match(/(\d{1,3})%/);
    const score = percentMatch ? parseInt(percentMatch[1]) : 75;

    // Show results
    resultsDiv.classList.remove('hidden');

    // Animate score
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
        currentScore += 2;
        if (currentScore >= score) {
            currentScore = score;
            clearInterval(scoreInterval);
        }
        scoreValue.textContent = currentScore + '%';
    }, 20);

    // Format and display the analysis
    const formattedAnalysis = analysis
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/- /g, '• ');

    matchedSkillsDiv.innerHTML = `<h4>AI Analysis</h4><div class="skill-match-item"><div class="skill-reason">${formattedAnalysis}</div></div>`;
    matchedProjectsDiv.innerHTML = '';
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatIcon = chatbotToggle.querySelector('.chat-icon');
    const closeIcon = chatbotToggle.querySelector('.close-icon');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');
    const skillsMatcherBtn = document.getElementById('skills-matcher-btn');
    const modalOverlay = document.getElementById('skills-modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const analyzeBtn = document.getElementById('analyze-btn');
    const jobDescription = document.getElementById('job-description');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
        chatIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    // Send message on button click
    chatSend.addEventListener('click', handleUserInput);

    // Send message on Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Handle suggestion clicks
    document.getElementById('chatbot-messages').addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.parentElement.classList.contains('suggestions')) {
            chatInput.value = e.target.textContent.replace(/['"]/g, '');
            handleUserInput();
        }
    });

    // Open skills matcher modal
    skillsMatcherBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('hidden');
        jobDescription.focus();
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });

    // Analyze job fit
    analyzeBtn.addEventListener('click', async () => {
        const jd = jobDescription.value.trim();
        if (!jd) {
            alert('Please paste a job description first!');
            return;
        }

        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span> Analyzing...';

        const analysis = await analyzeJobFit(jd);
        displayJobFitResults(analysis);

        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Analyze Fit`;
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlay.classList.add('hidden');
        }
    });
});

// ============================================
// Add typing indicator CSS dynamically
// ============================================
const style = document.createElement('style');
style.textContent = `
.typing-indicator .message-content {
    display: flex;
    gap: 4px;
    padding: 16px 20px;
}
.typing-indicator .dot {
    width: 8px;
    height: 8px;
    background: var(--primary-light);
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out;
}
.typing-indicator .dot:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator .dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes typingBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
}
.analyze-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
.analyze-btn .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: typingBounce 1.4s infinite ease-in-out;
}
`;
document.head.appendChild(style);
