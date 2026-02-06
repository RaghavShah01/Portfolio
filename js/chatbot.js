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
Machine Learning Engineer with expertise in developing and deploying production-ready AI solutions on AWS. Skilled in prototyping and optimizing models for computer vision and high-dimensional embeddings using Python, PyTorch, TensorFlow, and SageMaker. Achieved a 40% reduction in inference time and built scalable pipelines that streamlined annotation workflows and cut operational costs by $200K+ annually. Passionate about translating research into practical healthcare applications and embedding ML capabilities into software platforms.

## EDUCATION
1. Illinois Institute of Technology (Aug 2024 - May 2026)
   - Master's in Artificial Intelligence, GPA: 3.88/4.0
   - Received 40% merit sponsorship
   - Coursework: Machine Learning, Advanced AI, Time Series Analysis, NLP, Big Data Technologies, Software Project Management

2. Chandigarh University (Aug 2020 - May 2024)
   - Bachelor's in Computer Science, GPA: 8.27/10
   - Vice President of IEEE Student Club (2023)

## WORK EXPERIENCE

### CCC Intelligent Solutions | Data Science Engineer Intern (May 2025 - Present)
- Optimized and deployed computer vision models using AWS SageMaker and Kubernetes, reducing inference time by 40%
- Migrated deployed models to AWS Graviton, creating cost-efficient pipelines that reduced infrastructure costs
- Engineered a custom data annotation platform, boosting annotation speed by 50% and saving over $200K annually
- Designed scalable visualization tool for exploring 100K+ image embeddings, improving model iteration cycles by 30%
- Developed model inference pipelines using PyTorch and TensorFlow on AWS SageMaker
- Automated car damage detection, tag prediction, and production releases via AWS Step Functions

### Edifecs Technologies | Associate Data Engineer (Jan 2024 - Aug 2024)
- Managed deployment of 15+ Health Insurance Enrollment Software suites on AWS
- Processed 1M+ EDI and 834 Enrollment files with HIPAA compliance
- Used AWS services (EC2, S3, Lambda, RDS, Step Functions) and Docker
- Reduced transaction processing time by 20%

### Celebel Technologies | Data Science Intern (Jun 2023 - Dec 2023)
- Developed interactive dashboards using Matplotlib and Pandas
- Applied deep learning with PyTorch, reducing design iteration time by 15%

## PROJECTS

### MedCompare - AI-Driven Medication Data Evaluation Platform (Apr 2025)
- Built benchmarking engine to evaluate AI-generated drug data across 400+ medications
- Used fuzzy logic, semantic similarity scoring, and LLMs (OpenAI, Gemini, Llama, DeepSeek)
- Achieved 87% overall accuracy, reduced validation time by 60%
- Processed 10,000+ JSON records, validated 10+ clinical fields
- FHIR-compliant for clinical integration

### CTA Data Analysis - Big Data ETL Pipeline (2024-2025)
- End-to-end serverless ETL pipeline for Chicago Transit Authority data
- Architecture: S3 → Lambda → Redshift, Tableau visualization
- Analyzed ridership, crime, weather from 2001-2025
- Processed 8,970+ daily ridership records
- Found post-pandemic ridership below 2019 levels
- Identified crime hotspots on CTA platforms
- Recommended 20-30% summer security staff increase
- Future scope: SageMaker predictive modeling, Kinesis streaming

### Invisible Lines - Chicago Community Network Analysis (Dec 2025)
- Network science and spatial analytics project
- Examined economic segregation, crime patterns, transit accessibility
- Used Global Moran's I, network regression, Holt-Winters forecasting
- Found R² > 0.99 crime spillover correlation
- Identified 197x transit disparity between communities
- Led spatial econometrics analysis

### Hybrid AgileGen - AI-Driven Software Planning (Nov 2024)
- Combined Scrum and Waterfall methodologies
- Created 10+ use cases, 30+ requirements, 5 workflows
- Used Autogen, LangChain, LangGraph with OpenAI and Gemini
- Boosted planning efficiency by 30%

## TECHNICAL SKILLS
- ML & AI: PyTorch, TensorFlow, Scikit-learn, NumPy, Pandas, NLTK, LLMs, LangChain, OpenCV
- Programming: Python, C++, R, Java, C#, JavaScript, Kotlin, HTML, CSS
- Databases: SQL, Firebase, SQLite, MongoDB, AWS DynamoDB
- Cloud & DevOps: AWS (SageMaker, Lambda, S3, EC2, Redshift, Bedrock, Step Functions, EventBridge, ECR), Docker, Kubernetes, CI/CD, Git
- Frameworks: React, Node.js, Flask

## PUBLICATION
"Enhancing Machine Learning Model Using Explainable AI" - Springer LNNS, Volume 796, Jan 2024
- Integrated LIME and SHAP techniques
- Achieved 98% accuracy on Hotel Review Management Model

## ACHIEVEMENTS
- 40% merit sponsorship from Illinois Institute of Technology (2024)
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
