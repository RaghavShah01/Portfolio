// ============================================
// Raghav's Portfolio Data
// ============================================
const portfolioData = {
    name: "Raghav Shah",
    title: "Machine Learning Engineer",
    location: "Chicago, IL",
    email: "r.shah.aiengineer@gmail.com",
    phone: "+1 (872) 258-3155",
    linkedin: "linkedin.com/in/raghav-shah01",
    github: "github.com/RaghavShah01",

    summary: "Machine Learning Engineer with expertise in developing and deploying production-ready AI solutions on AWS. Skilled in prototyping and optimizing models for computer vision and high-dimensional embeddings. Achieved 40% reduction in inference time and $200K+ in annual cost savings.",

    education: [
        {
            school: "Illinois Institute of Technology",
            degree: "Master, Artificial Intelligence",
            gpa: "3.88/4.0",
            duration: "Aug 2024 - May 2026",
            coursework: ["Machine Learning", "Advanced AI", "Time Series Analysis", "NLP", "Big Data Technologies"]
        },
        {
            school: "Chandigarh University",
            degree: "Bachelor, Computer Science",
            gpa: "8.27/10",
            duration: "Aug 2020 - May 2024"
        }
    ],

    experience: [
        {
            company: "CCC Intelligent Solutions",
            role: "Data Science Engineer Intern",
            duration: "May 2025 - Present",
            highlights: [
                "Optimized computer vision models using AWS SageMaker and Kubernetes, reducing inference time by 40%",
                "Engineered custom data annotation platform, boosting annotation speed by 50% and saving $200K+ annually",
                "Designed scalable visualization tool for 100K+ image embeddings",
                "Developed model inference pipelines using PyTorch and TensorFlow"
            ],
            skills: ["AWS SageMaker", "Kubernetes", "PyTorch", "TensorFlow", "Computer Vision", "Python"]
        },
        {
            company: "Edifecs Technologies",
            role: "Associate Data Engineer",
            duration: "Jan 2024 - Aug 2024",
            highlights: [
                "Managed deployment of 15+ Health Insurance Enrollment Software suites on AWS",
                "Processed 1M+ EDI files with HIPAA compliance",
                "Reduced transaction processing time by 20% using AWS services and Docker"
            ],
            skills: ["AWS EC2", "S3", "Lambda", "RDS", "Docker", "HIPAA"]
        },
        {
            company: "Celebel Technologies",
            role: "Data Science Intern",
            duration: "Jun 2023 - Dec 2023",
            highlights: [
                "Developed interactive dashboards using Matplotlib and Pandas",
                "Applied deep learning techniques with PyTorch, reducing design iteration time by 15%"
            ],
            skills: ["PyTorch", "Pandas", "Matplotlib", "Deep Learning"]
        }
    ],

    projects: [
        {
            name: "MedCompare",
            subtitle: "AI-Driven Medication Data Evaluation Platform",
            date: "Apr 2025",
            description: "Built a benchmarking engine to evaluate AI-generated drug data across 400+ medications using fuzzy logic, semantic similarity scoring, and LLMs, achieving 87% accuracy and reducing validation time by 60%.",
            highlights: [
                "Processed 10,000+ JSON records with FHIR-compliant integration",
                "Validated 10+ clinical fields including dosage and adverse reactions"
            ],
            skills: ["OpenAI", "Gemini", "Llama", "DeepSeek", "FHIR", "Python", "LLMs"]
        },
        {
            name: "CTA Data Analysis",
            subtitle: "Big Data ETL Pipeline for Chicago Transit",
            date: "2024-2025",
            description: "Built an end-to-end serverless ETL pipeline analyzing Chicago Transit Authority ridership, crime, and weather data from 2001-2025. Automated pipeline triggers on S3 upload via Lambda.",
            highlights: [
                "Processed 8,970+ daily ridership records spanning ~20 years",
                "Identified crime hotspots on CTA platforms",
                "Future scope: SageMaker predictive modeling & Kinesis real-time streaming"
            ],
            skills: ["AWS S3", "Lambda", "Redshift", "Python", "Tableau", "ETL", "Big Data"]
        },
        {
            name: "Invisible Lines",
            subtitle: "Chicago Community Network Analysis",
            date: "Dec 2025",
            description: "Applied network science and spatial analytics to examine economic segregation, infrastructure vulnerability, crime patterns, and transit accessibility across Chicago communities.",
            highlights: [
                "Found R² > 0.99 crime spillover correlation between neighboring areas",
                "Identified 197x transit disparity between communities",
                "Led spatial econometrics analysis with Queen contiguity weight matrices"
            ],
            skills: ["Spatial Analytics", "Network Science", "Moran's I", "Holt-Winters", "Python"]
        },
        {
            name: "Hybrid AgileGen",
            subtitle: "AI-Driven Software Planning",
            date: "Nov 2024",
            description: "Combined Scrum and Waterfall methodologies to plan web-based mobile apps, creating 10+ use cases, 30+ requirements, and 5 workflows.",
            highlights: [
                "Generated 20+ outputs boosting planning efficiency by 30%",
                "Utilized GenAI tools Autogen, LangChain, and LangGraph"
            ],
            skills: ["Autogen", "LangChain", "LangGraph", "OpenAI", "Gemini"]
        }
    ],

    skills: {
        "Machine Learning & AI": ["Scikit-learn", "NumPy", "Pandas", "NLTK", "LLMs", "LangChain", "OpenCV", "TensorFlow", "PyTorch"],
        "Programming Languages": ["Python", "C++", "R", "Java", "C#", "JavaScript", "Kotlin", "HTML", "CSS"],
        "Databases": ["SQL", "Firebase", "SQLite", "MongoDB", "AWS DynamoDB"],
        "Frameworks & Libraries": ["React", "Node.js", "Flask"],
        "Cloud & DevOps": ["AWS SageMaker", "Amazon Bedrock", "AWS Lambda", "EC2", "S3", "ECR", "Step Functions", "EventBridge", "Docker", "CI/CD", "Git", "Kubernetes"]
    },

    publications: [
        {
            title: "Enhancing ML Model Using Explainable AI",
            venue: "Springer LNNS, Volume 796",
            date: "Jan 2024",
            description: "Integrated LIME and SHAP techniques, achieving 98% accuracy on Hotel Review Management Model"
        }
    ],

    achievements: [
        "40% merit sponsorship from Illinois Institute of Technology (2024)",
        "Vice President, IEEE Student Club at Chandigarh University (2023)"
    ]
};

// ============================================
// Chatbot Knowledge Base
// ============================================
const knowledgeBase = [
    // Greetings
    {
        patterns: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
        response: "Hello! I'm Raghav's AI assistant. I can tell you about his skills, projects, experience, or education. What would you like to know?"
    },

    // About/Introduction
    {
        patterns: ["who is raghav", "tell me about raghav", "about you", "introduce yourself", "who are you", "about raghav"],
        response: `Raghav Shah is a <strong>Machine Learning Engineer</strong> based in Chicago, IL. He's currently pursuing his Master's in AI at Illinois Institute of Technology (GPA: 3.88) while working as a Data Science Engineer Intern at CCC Intelligent Solutions.\n\nKey achievements:\n• 40% reduction in inference time\n• $200K+ annual cost savings\n• Processed 100K+ image embeddings`
    },

    // PyTorch
    {
        patterns: ["pytorch", "py torch", "torch"],
        response: `Raghav has extensive <strong>PyTorch</strong> experience:\n\n<strong>At CCC Intelligent Solutions:</strong>\n• Developed model inference pipelines for computer vision models\n• Optimized models reducing inference time by 40%\n\n<strong>At Celebel Technologies:</strong>\n• Applied deep learning techniques reducing design iteration by 15%\n\nPyTorch is one of his core ML frameworks alongside TensorFlow.`
    },

    // TensorFlow
    {
        patterns: ["tensorflow", "tensor flow", "tf"],
        response: `Raghav uses <strong>TensorFlow</strong> professionally:\n\n<strong>At CCC Intelligent Solutions:</strong>\n• Developed and maintained model inference pipelines\n• Deployed models on AWS SageMaker\n• Built production-ready computer vision solutions\n\nHe's proficient in both TensorFlow and PyTorch for deep learning.`
    },

    // AWS
    {
        patterns: ["aws", "amazon web services", "cloud", "sagemaker", "lambda", "s3", "ec2"],
        response: `Raghav has strong <strong>AWS expertise</strong>:\n\n<strong>Services:</strong> SageMaker, Lambda, S3, EC2, Redshift, Step Functions, EventBridge, ECR, Bedrock, DynamoDB\n\n<strong>Experience:</strong>\n• Deployed computer vision models on SageMaker with Kubernetes\n• Built serverless ETL pipelines (S3 → Lambda → Redshift)\n• Migrated services to AWS Graviton for cost savings\n• Processed 1M+ files with HIPAA compliance`
    },

    // Computer Vision
    {
        patterns: ["computer vision", "cv", "image", "vision", "opencv"],
        response: `Raghav specializes in <strong>Computer Vision</strong>:\n\n<strong>At CCC Intelligent Solutions:</strong>\n• Optimized CV models using AWS SageMaker & Kubernetes\n• Achieved 40% inference time reduction\n• Built visualization tool for 100K+ image embeddings\n• Automated car damage detection pipelines\n\nSkills: OpenCV, PyTorch, TensorFlow, image segmentation, embeddings`
    },

    // LLMs
    {
        patterns: ["llm", "large language model", "gpt", "openai", "gemini", "langchain", "llama"],
        response: `Raghav works with <strong>LLMs and GenAI</strong>:\n\n<strong>MedCompare Project:</strong>\n• Used OpenAI, Gemini, Llama, DeepSeek for drug data evaluation\n• Achieved 87% accuracy with semantic similarity scoring\n\n<strong>Hybrid AgileGen:</strong>\n• Built with Autogen, LangChain, LangGraph\n• Integrated OpenAI and Gemini for software planning\n\nSkills: LangChain, prompt engineering, RAG architectures`
    },

    // MedCompare Project
    {
        patterns: ["medcompare", "med compare", "medication", "drug", "healthcare ai"],
        response: `<strong>MedCompare</strong> (Apr 2025)\nAI-Driven Medication Data Evaluation Platform\n\n<strong>What it does:</strong>\n• Evaluates AI-generated drug data across 400+ medications\n• Uses fuzzy logic, semantic similarity, and multiple LLMs\n\n<strong>Results:</strong>\n• 87% overall accuracy\n• 60% reduction in validation time vs manual review\n• Processed 10,000+ JSON records\n• FHIR-compliant for clinical integration\n\n<strong>Tech:</strong> OpenAI, Gemini, Llama, DeepSeek, Python`
    },

    // CTA Project
    {
        patterns: ["cta", "chicago transit", "transit", "etl", "data pipeline", "big data"],
        response: `<strong>CTA Data Analysis</strong> (2024-2025)\nBig Data ETL Pipeline for Chicago Transit\n\n<strong>Architecture:</strong>\n• Serverless: S3 → Lambda → Redshift\n• Automated triggers on file upload\n• Tableau for visualization\n\n<strong>Data:</strong>\n• 8,970+ daily ridership records (2001-2025)\n• Crime incidents, weather, holidays\n\n<strong>Findings:</strong>\n• Post-pandemic ridership below 2019 levels\n• Crime hotspots on CTA platforms & buses\n• Recommended 20-30% summer security increase\n\n<strong>Tech:</strong> AWS S3, Lambda, Redshift, Python, Tableau`
    },

    // Invisible Lines Project
    {
        patterns: ["invisible lines", "network analysis", "spatial", "chicago community", "segregation"],
        response: `<strong>Invisible Lines</strong> (Dec 2025)\nChicago Community Network Analysis\n\n<strong>Objective:</strong> Examine economic segregation, crime patterns, and transit accessibility across Chicago communities.\n\n<strong>Methods:</strong>\n• Global Moran's I for spatial autocorrelation\n• Network regression for crime spillover\n• Holt-Winters forecasting\n\n<strong>Key Findings:</strong>\n• R² > 0.99 crime spillover correlation\n• 197x transit disparity between areas\n• Beverly's income 2.5x South Shore's\n\n<strong>Tech:</strong> Spatial Analytics, Network Science, Python`
    },

    // Hybrid AgileGen Project
    {
        patterns: ["agilegen", "agile", "software planning", "scrum", "project management"],
        response: `<strong>Hybrid AgileGen</strong> (Nov 2024)\nAI-Driven Software Planning\n\n<strong>What it does:</strong>\n• Combines Scrum and Waterfall methodologies\n• AI-assisted project planning\n\n<strong>Output:</strong>\n• 10+ use cases\n• 30+ requirements\n• 5 workflows (Requirements → Documentation)\n• 20+ AI-generated outputs\n\n<strong>Results:</strong>\n• 30% boost in planning efficiency\n\n<strong>Tech:</strong> Autogen, LangChain, LangGraph, OpenAI, Gemini`
    },

    // Experience
    {
        patterns: ["experience", "work", "job", "career", "employment", "intern"],
        response: `<strong>Raghav's Experience:</strong>\n\n<strong>1. CCC Intelligent Solutions</strong> (May 2025 - Present)\nData Science Engineer Intern\n• Computer vision model optimization (40% faster)\n• $200K+ annual cost savings\n• 100K+ image embeddings visualization\n\n<strong>2. Edifecs Technologies</strong> (Jan - Aug 2024)\nAssociate Data Engineer\n• 15+ software deployments on AWS\n• 1M+ EDI files, HIPAA compliant\n\n<strong>3. Celebel Technologies</strong> (Jun - Dec 2023)\nData Science Intern\n• Deep learning with PyTorch\n• Interactive dashboards`
    },

    // Education
    {
        patterns: ["education", "degree", "university", "college", "school", "study", "gpa", "iit", "chandigarh"],
        response: `<strong>Raghav's Education:</strong>\n\n<strong>Illinois Institute of Technology</strong>\nMaster, Artificial Intelligence\nGPA: 3.88/4.0 | Aug 2024 - May 2026\n• 40% merit sponsorship\n• Coursework: ML, Advanced AI, NLP, Time Series, Big Data\n\n<strong>Chandigarh University</strong>\nBachelor, Computer Science\nGPA: 8.27/10 | Aug 2020 - May 2024\n• Vice President, IEEE Student Club`
    },

    // Skills
    {
        patterns: ["skills", "technologies", "tech stack", "what can you do", "capabilities"],
        response: `<strong>Raghav's Technical Skills:</strong>\n\n<strong>ML & AI:</strong> PyTorch, TensorFlow, Scikit-learn, LangChain, OpenCV, LLMs\n\n<strong>Languages:</strong> Python, JavaScript, C++, Java, R, SQL\n\n<strong>Cloud:</strong> AWS (SageMaker, Lambda, S3, EC2, Redshift, Bedrock), Docker, Kubernetes\n\n<strong>Data:</strong> Pandas, NumPy, Tableau, MongoDB, DynamoDB\n\n<strong>Web:</strong> React, Node.js, Flask`
    },

    // Contact
    {
        patterns: ["contact", "email", "phone", "reach", "hire", "connect", "linkedin", "github"],
        response: `<strong>Contact Raghav:</strong>\n\n📧 Email: r.shah.aiengineer@gmail.com\n📱 Phone: +1 (872) 258-3155\n💼 LinkedIn: linkedin.com/in/raghav-shah01\n💻 GitHub: github.com/RaghavShah01\n📍 Location: Chicago, IL\n\nHe's open to new opportunities!`
    },

    // Publications
    {
        patterns: ["publication", "paper", "research", "springer", "published"],
        response: `<strong>Raghav's Publication:</strong>\n\n"Enhancing ML Model Using Explainable AI"\nSpringer LNNS, Volume 796 | Jan 2024\n\n• Integrated LIME and SHAP techniques\n• Highlighted top 5 prediction-influencing features\n• Achieved 98% accuracy on Hotel Review Model\n• Demonstrated model interpretability techniques`
    },

    // Achievements
    {
        patterns: ["achievement", "award", "honor", "accomplishment", "merit"],
        response: `<strong>Raghav's Achievements:</strong>\n\n🏆 <strong>40% Merit Sponsorship</strong>\nIllinois Institute of Technology, 2024\n\n🏆 <strong>Vice President, IEEE Student Club</strong>\nChandigarh University, 2023\n\n📊 <strong>Professional Impact:</strong>\n• 40% inference time reduction\n• $200K+ annual cost savings\n• 100K+ embeddings processed`
    },

    // Projects list
    {
        patterns: ["projects", "portfolio", "what have you built", "show me projects"],
        response: `<strong>Raghav's Projects:</strong>\n\n1. <strong>MedCompare</strong> - AI medication data evaluation (87% accuracy)\n\n2. <strong>CTA Data Analysis</strong> - Big Data ETL for Chicago Transit\n\n3. <strong>Invisible Lines</strong> - Chicago community network analysis\n\n4. <strong>Hybrid AgileGen</strong> - AI-driven software planning\n\nAsk about any specific project for details!`
    },

    // Python
    {
        patterns: ["python"],
        response: `<strong>Python</strong> is Raghav's primary language:\n\n• ML/AI: PyTorch, TensorFlow, Scikit-learn, OpenCV\n• Data: Pandas, NumPy, Matplotlib\n• Web: Flask, FastAPI\n• AWS: Lambda functions, SageMaker\n• LLMs: LangChain, OpenAI SDK\n\nUsed across all projects and professional work.`
    },

    // Kubernetes/Docker
    {
        patterns: ["kubernetes", "k8s", "docker", "container", "devops"],
        response: `Raghav has <strong>DevOps/MLOps</strong> experience:\n\n<strong>Kubernetes:</strong>\n• Deployed CV models on K8s clusters at CCC\n• Container orchestration for ML pipelines\n\n<strong>Docker:</strong>\n• Containerized deployments at Edifecs\n• Improved reliability in healthcare systems\n\n<strong>CI/CD:</strong>\n• Automated deployment workflows\n• AWS Step Functions for orchestration`
    },

    // Default/fallback
    {
        patterns: [],
        response: "I can help you learn about Raghav! Try asking about:\n• His skills (PyTorch, AWS, LLMs)\n• Projects (MedCompare, CTA Analysis)\n• Work experience\n• Education\n• Contact information\n\nOr click the 'Job Fit' button to see how his skills match a job description!"
    }
];

// ============================================
// Chatbot Functions
// ============================================
function findBestResponse(input) {
    const normalizedInput = input.toLowerCase().trim();

    let bestMatch = null;
    let highestScore = 0;

    for (const item of knowledgeBase) {
        if (item.patterns.length === 0) continue;

        for (const pattern of item.patterns) {
            if (normalizedInput.includes(pattern)) {
                const score = pattern.length;
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = item;
                }
            }
        }
    }

    return bestMatch ? bestMatch.response : knowledgeBase[knowledgeBase.length - 1].response;
}

function addMessage(content, isUser = false) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleUserInput() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, true);
    input.value = '';

    // Simulate typing delay
    setTimeout(() => {
        const response = findBestResponse(message);
        addMessage(response);
    }, 500);
}

// ============================================
// Skills Matcher Functions
// ============================================
const allSkills = [
    // ML & AI
    { name: "Python", category: "Programming", keywords: ["python", "py"] },
    { name: "PyTorch", category: "ML Framework", keywords: ["pytorch", "torch"] },
    { name: "TensorFlow", category: "ML Framework", keywords: ["tensorflow", "tf", "keras"] },
    { name: "Machine Learning", category: "Core", keywords: ["machine learning", "ml", "modeling"] },
    { name: "Deep Learning", category: "Core", keywords: ["deep learning", "neural network", "dl"] },
    { name: "Computer Vision", category: "Specialty", keywords: ["computer vision", "cv", "image processing", "opencv"] },
    { name: "NLP", category: "Specialty", keywords: ["nlp", "natural language", "text processing"] },
    { name: "LLMs", category: "AI", keywords: ["llm", "large language model", "gpt", "chatgpt", "generative ai", "genai"] },
    { name: "LangChain", category: "AI Framework", keywords: ["langchain", "lang chain"] },
    { name: "Scikit-learn", category: "ML Library", keywords: ["scikit", "sklearn", "scikit-learn"] },
    { name: "Pandas", category: "Data", keywords: ["pandas"] },
    { name: "NumPy", category: "Data", keywords: ["numpy"] },

    // Cloud & DevOps
    { name: "AWS", category: "Cloud", keywords: ["aws", "amazon web services"] },
    { name: "AWS SageMaker", category: "ML Platform", keywords: ["sagemaker", "sage maker"] },
    { name: "AWS Lambda", category: "Serverless", keywords: ["lambda", "serverless"] },
    { name: "AWS S3", category: "Storage", keywords: ["s3", "bucket"] },
    { name: "AWS EC2", category: "Compute", keywords: ["ec2", "instance"] },
    { name: "AWS Redshift", category: "Data Warehouse", keywords: ["redshift"] },
    { name: "Docker", category: "DevOps", keywords: ["docker", "container"] },
    { name: "Kubernetes", category: "DevOps", keywords: ["kubernetes", "k8s"] },
    { name: "CI/CD", category: "DevOps", keywords: ["ci/cd", "cicd", "jenkins", "github actions"] },
    { name: "Git", category: "Version Control", keywords: ["git", "github", "version control"] },

    // Data
    { name: "SQL", category: "Database", keywords: ["sql", "mysql", "postgresql", "database"] },
    { name: "MongoDB", category: "Database", keywords: ["mongodb", "mongo", "nosql"] },
    { name: "ETL", category: "Data Engineering", keywords: ["etl", "data pipeline", "data engineering"] },
    { name: "Data Analysis", category: "Analytics", keywords: ["data analysis", "analytics", "data analyst"] },
    { name: "Tableau", category: "Visualization", keywords: ["tableau", "visualization", "dashboard"] },

    // Programming
    { name: "JavaScript", category: "Programming", keywords: ["javascript", "js", "node"] },
    { name: "React", category: "Frontend", keywords: ["react", "reactjs"] },
    { name: "Flask", category: "Backend", keywords: ["flask"] },
    { name: "Java", category: "Programming", keywords: ["java"] },
    { name: "C++", category: "Programming", keywords: ["c++", "cpp"] },

    // Soft Skills
    { name: "Communication", category: "Soft Skill", keywords: ["communication", "communicate"] },
    { name: "Team Collaboration", category: "Soft Skill", keywords: ["team", "collaboration", "collaborative"] },
    { name: "Problem Solving", category: "Soft Skill", keywords: ["problem solving", "analytical"] }
];

function analyzeJobFit(jobDescription) {
    const normalizedJD = jobDescription.toLowerCase();
    const matchedSkills = [];
    const matchedProjects = [];

    // Find matching skills
    for (const skill of allSkills) {
        for (const keyword of skill.keywords) {
            if (normalizedJD.includes(keyword)) {
                matchedSkills.push({
                    name: skill.name,
                    category: skill.category,
                    reason: getSkillReason(skill.name)
                });
                break;
            }
        }
    }

    // Find matching projects
    for (const project of portfolioData.projects) {
        const projectKeywords = project.skills.map(s => s.toLowerCase());
        const matchCount = projectKeywords.filter(k =>
            normalizedJD.includes(k) ||
            project.description.toLowerCase().split(' ').some(w => normalizedJD.includes(w))
        ).length;

        if (matchCount > 0 || projectKeywords.some(k => normalizedJD.includes(k))) {
            matchedProjects.push({
                name: project.name,
                subtitle: project.subtitle,
                reason: project.description.substring(0, 150) + '...'
            });
        }
    }

    // Calculate match score
    const totalPossible = 15; // Reasonable max skills to expect
    const score = Math.min(100, Math.round((matchedSkills.length / totalPossible) * 100 + (matchedProjects.length * 5)));

    return { score, matchedSkills, matchedProjects };
}

function getSkillReason(skillName) {
    const reasons = {
        "Python": "Primary programming language used across all ML projects and professional work",
        "PyTorch": "Used for computer vision models at CCC, reducing inference time by 40%",
        "TensorFlow": "Deployed models on AWS SageMaker for production inference pipelines",
        "Machine Learning": "Core expertise with 2+ years of hands-on experience in ML systems",
        "Deep Learning": "Applied DL at Celebel Technologies, reducing design iteration by 15%",
        "Computer Vision": "Specialized in CV at CCC, processing 100K+ image embeddings",
        "NLP": "Coursework in NLP, applied in LLM-based projects",
        "LLMs": "Built MedCompare using OpenAI, Gemini, Llama, DeepSeek",
        "LangChain": "Used in Hybrid AgileGen for AI-driven software planning",
        "AWS": "Extensive experience with SageMaker, Lambda, S3, EC2, Redshift",
        "AWS SageMaker": "Deployed and optimized ML models in production",
        "Docker": "Containerized deployments at Edifecs for healthcare systems",
        "Kubernetes": "Orchestrated CV model deployments at CCC",
        "SQL": "Database management across multiple projects",
        "ETL": "Built serverless ETL pipeline for CTA Data Analysis project",
        "Data Analysis": "Spatial analytics in Invisible Lines, data viz at Celebel"
    };
    return reasons[skillName] || `Demonstrated in projects and professional experience`;
}

function displayResults(results) {
    const resultsDiv = document.getElementById('match-results');
    const scoreValue = document.querySelector('.score-value');
    const matchedSkillsDiv = document.getElementById('matched-skills');
    const matchedProjectsDiv = document.getElementById('matched-projects');

    // Show results
    resultsDiv.classList.remove('hidden');

    // Animate score
    let currentScore = 0;
    const targetScore = results.score;
    const scoreInterval = setInterval(() => {
        currentScore += 2;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(scoreInterval);
        }
        scoreValue.textContent = currentScore + '%';
    }, 20);

    // Display matched skills
    if (results.matchedSkills.length > 0) {
        matchedSkillsDiv.innerHTML = `<h4>Matching Skills (${results.matchedSkills.length})</h4>`;
        results.matchedSkills.slice(0, 8).forEach(skill => {
            matchedSkillsDiv.innerHTML += `
                <div class="skill-match-item">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-reason">${skill.reason}</div>
                </div>
            `;
        });
    } else {
        matchedSkillsDiv.innerHTML = '<p style="color: var(--text-muted);">No direct skill matches found</p>';
    }

    // Display matched projects
    if (results.matchedProjects.length > 0) {
        matchedProjectsDiv.innerHTML = `<h4>Relevant Projects (${results.matchedProjects.length})</h4>`;
        results.matchedProjects.forEach(project => {
            matchedProjectsDiv.innerHTML += `
                <div class="project-match-item">
                    <div class="project-name">${project.name}</div>
                    <div class="project-reason">${project.reason}</div>
                </div>
            `;
        });
    } else {
        matchedProjectsDiv.innerHTML = '';
    }
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
    analyzeBtn.addEventListener('click', () => {
        const jd = jobDescription.value.trim();
        if (!jd) {
            alert('Please paste a job description first!');
            return;
        }
        const results = analyzeJobFit(jd);
        displayResults(results);
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlay.classList.add('hidden');
        }
    });
});
