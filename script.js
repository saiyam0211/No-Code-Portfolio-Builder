// Portfolio Builder JavaScript
class PortfolioBuilder {
    constructor() {
        this.currentTemplate = 'modern';
        this.portfolioData = {
            template: 'modern',
            personal: {
                fullName: '',
                title: '',
                tagline: '',
                availability: '',
                bio: '',
                email: '',
                phone: '',
                location: '',
                website: '',
                ctaPrimaryText: '',
                ctaPrimaryUrl: '',
                ctaSecondaryText: '',
                ctaSecondaryUrl: '',
                profilePhoto: null,
                heroImage: null
            },
            about: {
                description: '',
                skills: [],
                certifications: []
            },
            projects: [],
            experience: [],
            education: [],
            services: [],
            testimonials: [],
            process: [],
            highlights: [],
            logos: [],
            gallery: [],
            social: [],
            sectionVisibility: {
                about: true,
                projects: true,
                experience: true,
                education: true,
                services: true,
                testimonials: true,
                process: true,
                highlights: true,
                logos: true,
                gallery: true
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEventListeners();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    bindEventListeners() {
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectTemplate(e.currentTarget.dataset.template);
            });
        });
        
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.currentTarget.dataset.tab);
            });
        });
        
        // Form inputs
        this.bindFormInputs();
        
        // Add buttons
        document.getElementById('add-skill')?.addEventListener('click', () => this.addSkill());
        document.getElementById('add-certification')?.addEventListener('click', () => this.addCertification());
        document.getElementById('add-project')?.addEventListener('click', () => this.addProject());
        document.getElementById('add-experience')?.addEventListener('click', () => this.addExperience());
        document.getElementById('add-education')?.addEventListener('click', () => this.addEducation());
        document.getElementById('add-social')?.addEventListener('click', () => this.addSocialLink());
        document.getElementById('add-service')?.addEventListener('click', () => this.addService());
        document.getElementById('add-testimonial')?.addEventListener('click', () => this.addTestimonial());
        document.getElementById('add-step')?.addEventListener('click', () => this.addProcessStep());
        document.getElementById('add-highlight')?.addEventListener('click', () => this.addHighlight());
        document.getElementById('add-logo')?.addEventListener('click', () => this.addLogo());
        document.getElementById('add-gallery')?.addEventListener('click', () => this.addGalleryItem());
        
        // Control buttons
        document.getElementById('preview-btn')?.addEventListener('click', () => this.updatePreview());
        document.getElementById('save-btn')?.addEventListener('click', () => this.saveToLocalStorage());
        document.getElementById('load-btn')?.addEventListener('click', () => this.loadFromLocalStorage());
        document.getElementById('download-html')?.addEventListener('click', () => this.downloadHTML());
        document.getElementById('download-pdf')?.addEventListener('click', () => this.downloadPDF());
        document.getElementById('open-preview')?.addEventListener('click', () => this.openLivePreview());
        
        // Section visibility toggles
        document.getElementById('show-about')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.about = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-projects')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.projects = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-experience')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.experience = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-education')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.education = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-services')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.services = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-testimonials')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.testimonials = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-process')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.process = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-highlights')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.highlights = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-logos')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.logos = e.target.checked;
            this.updatePreview();
        });
        document.getElementById('show-gallery')?.addEventListener('change', (e) => {
            this.portfolioData.sectionVisibility.gallery = e.target.checked;
            this.updatePreview();
        });
        
        // Profile & hero uploads
        document.getElementById('profilePhoto')?.addEventListener('change', this.handlePhotoUpload.bind(this));
        const heroInput = document.getElementById('heroImage');
        if (heroInput) {
            heroInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.portfolioData.personal.heroImage = e.target.result;
                        const preview = document.getElementById('hero-preview');
                        if (preview) {
                            preview.innerHTML = '';
                            preview.style.backgroundImage = `url(${e.target.result})`;
                            preview.style.backgroundSize = 'cover';
                            preview.style.backgroundPosition = 'center';
                        }
                        this.updatePreview();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    bindFormInputs() {
        // Personal info inputs
        const personalFields = ['fullName', 'title', 'tagline', 'availability', 'bio', 'email', 'phone', 'location', 'website', 'ctaPrimaryText', 'ctaPrimaryUrl', 'ctaSecondaryText', 'ctaSecondaryUrl'];
        personalFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.portfolioData.personal[field] = e.target.value;
                    this.updatePreview();
                    this.updateCompletionStatus();
                });
            }
        });
        
        // About description
        const aboutDesc = document.getElementById('aboutDescription');
        if (aboutDesc) {
            aboutDesc.addEventListener('input', (e) => {
                this.portfolioData.about.description = e.target.value;
                this.updatePreview();
                this.updateCompletionStatus();
            });
        }
    }
    
    selectTemplate(templateName) {
        this.currentTemplate = templateName;
        this.portfolioData.template = templateName;
        
        // Update UI
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-template="${templateName}"]`)?.classList.add('active');
        
        this.updatePreview();
    }
    
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active', 'text-blue-600', 'border-blue-500');
            btn.classList.add('text-gray-500');
        });
        
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'text-blue-600', 'border-blue-500');
            activeBtn.classList.remove('text-gray-500');
        }
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabName}-tab`)?.classList.remove('hidden');
    }
    
    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.portfolioData.personal.profilePhoto = e.target.result;
                const preview = document.getElementById('profile-preview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Profile" class="w-20 h-20 rounded-full object-cover">`;
                }
                this.updatePreview();
            };
            reader.readAsDataURL(file);
        }
    }
    
    addSkill() {
        const skillId = Date.now();
        const skill = { id: skillId, name: '', proficiency: 70 };
        this.portfolioData.about.skills.push(skill);
        this.renderSkill(skill);
        this.updateCompletionStatus();
    }
    
    renderSkill(skill) {
        const container = document.getElementById('skills-container');
        if (!container) return;
        
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item relative';
        skillDiv.dataset.skillId = skill.id;
        
        skillDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeSkill(${skill.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                    <input type="text" value="${skill.name}" 
                           onchange="portfolioBuilder.updateSkill(${skill.id}, 'name', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="e.g., JavaScript">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Proficiency (${skill.proficiency}%)</label>
                    <input type="range" min="0" max="100" value="${skill.proficiency}"
                           onchange="portfolioBuilder.updateSkill(${skill.id}, 'proficiency', this.value); this.previousElementSibling.textContent = 'Proficiency (' + this.value + '%)';"
                           class="proficiency-slider w-full">
                </div>
            </div>
        `;
        
        container.appendChild(skillDiv);
    }
    
    updateSkill(id, field, value) {
        const skill = this.portfolioData.about.skills.find(s => s.id === id);
        if (skill) {
            skill[field] = field === 'proficiency' ? parseInt(value) : value;
            this.updatePreview();
        }
    }
    
    removeSkill(id) {
        this.portfolioData.about.skills = this.portfolioData.about.skills.filter(s => s.id !== id);
        const element = document.querySelector(`[data-skill-id="${id}"]`);
        if (element) element.remove();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    // Certifications
    addCertification() {
        const certId = Date.now();
        const certification = { id: certId, name: '', issuer: '', year: '' };
        this.portfolioData.about.certifications.push(certification);
        this.renderCertification(certification);
        this.updateCompletionStatus();
    }
    
    renderCertification(cert) {
        const container = document.getElementById('certifications-container');
        if (!container) return;
        
        const certDiv = document.createElement('div');
        certDiv.className = 'certification-item relative';
        certDiv.dataset.certId = cert.id;
        certDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeCertification(${cert.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" value="${cert.name}" 
                           onchange="portfolioBuilder.updateCertification(${cert.id}, 'name', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                           placeholder="Certification name">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Issuer</label>
                    <input type="text" value="${cert.issuer}" 
                           onchange="portfolioBuilder.updateCertification(${cert.id}, 'issuer', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                           placeholder="Issuing organization">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input type="text" value="${cert.year}" 
                           onchange="portfolioBuilder.updateCertification(${cert.id}, 'year', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                           placeholder="YYYY">
                </div>
            </div>
        `;
        container.appendChild(certDiv);
    }
    
    updateCertification(id, field, value) {
        const cert = this.portfolioData.about.certifications.find(c => c.id === id);
        if (cert) {
            cert[field] = value;
            this.updatePreview();
        }
    }
    
    removeCertification(id) {
        this.portfolioData.about.certifications = this.portfolioData.about.certifications.filter(c => c.id !== id);
        const element = document.querySelector(`[data-cert-id="${id}"]`);
        if (element) element.remove();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    addProject() {
        const projectId = Date.now();
        const project = {
            id: projectId,
            title: '',
            description: '',
            technologies: '',
            liveUrl: '',
            githubUrl: '',
            image: null
        };
        
        this.portfolioData.projects.push(project);
        this.renderProject(project);
        this.updateCompletionStatus();
    }
    
    renderProject(project) {
        const container = document.getElementById('projects-container');
        if (!container) return;
        
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-card relative';
        projectDiv.dataset.projectId = project.id;
        
        projectDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeProject(${project.id})">×</button>
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                        <input type="text" value="${project.title}" 
                               onchange="portfolioBuilder.updateProject(${project.id}, 'title', this.value)"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               placeholder="e.g., E-commerce Website">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                        <input type="text" value="${project.technologies}" 
                               onchange="portfolioBuilder.updateProject(${project.id}, 'technologies', this.value)"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               placeholder="e.g., React, Node.js">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea rows="3" 
                              onchange="portfolioBuilder.updateProject(${project.id}, 'description', this.value)"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                              placeholder="Describe your project...">${project.description}</textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                        <input type="url" value="${project.liveUrl}" 
                               onchange="portfolioBuilder.updateProject(${project.id}, 'liveUrl', this.value)"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                               placeholder="https://your-project.com">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                        <input type="url" value="${project.githubUrl}" 
                               onchange="portfolioBuilder.updateProject(${project.id}, 'githubUrl', this.value)"
                               class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                               placeholder="https://github.com/username/repo">
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(projectDiv);
    }
    
    updateProject(id, field, value) {
        const project = this.portfolioData.projects.find(p => p.id === id);
        if (project) {
            project[field] = value;
            this.updatePreview();
        }
    }
    
    removeProject(id) {
        this.portfolioData.projects = this.portfolioData.projects.filter(p => p.id !== id);
        const element = document.querySelector(`[data-project-id="${id}"]`);
        if (element) element.remove();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    // Social
    addSocialLink() {
        const socialId = Date.now();
        const social = { id: socialId, platform: 'github', url: '', label: '' };
        this.portfolioData.social.push(social);
        this.renderSocialLink(social);
        this.updateCompletionStatus();
    }
    
    renderSocialLink(social) {
        const container = document.getElementById('social-container');
        if (!container) return;
        
        const socialDiv = document.createElement('div');
        socialDiv.className = 'social-item relative';
        socialDiv.dataset.socialId = social.id;
        
        socialDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeSocialLink(${social.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <select onchange="portfolioBuilder.updateSocialLink(${social.id}, 'platform', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="github" ${social.platform === 'github' ? 'selected' : ''}>GitHub</option>
                        <option value="linkedin" ${social.platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                        <option value="twitter" ${social.platform === 'twitter' ? 'selected' : ''}>Twitter</option>
                        <option value="website" ${social.platform === 'website' ? 'selected' : ''}>Website</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
                    <input type="url" value="${social.url}" 
                           onchange="portfolioBuilder.updateSocialLink(${social.id}, 'url', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                           placeholder="https://github.com/username">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Label (Optional)</label>
                    <input type="text" value="${social.label}" 
                           onchange="portfolioBuilder.updateSocialLink(${social.id}, 'label', this.value)"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                           placeholder="Custom name">
                </div>
            </div>
        `;
        
        container.appendChild(socialDiv);
    }
    
    updateSocialLink(id, field, value) {
        const social = this.portfolioData.social.find(s => s.id === id);
        if (social) {
            social[field] = value;
            this.updatePreview();
        }
    }
    
    removeSocialLink(id) {
        this.portfolioData.social = this.portfolioData.social.filter(s => s.id !== id);
        const element = document.querySelector(`[data-social-id="${id}"]`);
        if (element) element.remove();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    // Experience
    addExperience() {
        const expId = Date.now();
        const experience = { id: expId, company: '', role: '', start: '', end: '', description: '' };
        this.portfolioData.experience.push(experience);
        this.renderExperience(experience);
        this.updateCompletionStatus();
    }
    
    renderExperience(exp) {
        const container = document.getElementById('experience-container');
        if (!container) return;
        const expDiv = document.createElement('div');
        expDiv.className = 'experience-item relative';
        expDiv.dataset.expId = exp.id;
        expDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeExperience(${exp.id})">×</button>
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <input type="text" value="${exp.company}" onchange="portfolioBuilder.updateExperience(${exp.id}, 'company', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Company name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Role/Title</label>
                        <input type="text" value="${exp.role}" onchange="portfolioBuilder.updateExperience(${exp.id}, 'role', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Job title">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Start</label>
                        <input type="text" value="${exp.start}" onchange="portfolioBuilder.updateExperience(${exp.id}, 'start', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Jan 2021">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">End</label>
                        <input type="text" value="${exp.end}" onchange="portfolioBuilder.updateExperience(${exp.id}, 'end', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Present">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea rows="3" onchange="portfolioBuilder.updateExperience(${exp.id}, 'description', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="What did you work on?">${exp.description}</textarea>
                </div>
            </div>
        `;
        container.appendChild(expDiv);
    }
    
    updateExperience(id, field, value) {
        const exp = this.portfolioData.experience.find(e => e.id === id);
        if (exp) {
            exp[field] = value;
            this.updatePreview();
        }
    }
    
    removeExperience(id) {
        this.portfolioData.experience = this.portfolioData.experience.filter(e => e.id !== id);
        const element = document.querySelector(`[data-exp-id=\"${id}\"]`);
        if (element) element.remove();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    // Education
    addEducation() {
        const eduId = Date.now();
        const education = { id: eduId, school: '', degree: '', field: '', start: '', end: '', description: '' };
        this.portfolioData.education.push(education);
        this.renderEducation(education);
        this.updateCompletionStatus();
    }
    
    renderEducation(edu) {
        const container = document.getElementById('education-container');
        if (!container) return;
        const eduDiv = document.createElement('div');
        eduDiv.className = 'education-item relative';
        eduDiv.dataset.eduId = edu.id;
        eduDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeEducation(${edu.id})">×</button>
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">School</label>
                        <input type="text" value="${edu.school}" onchange="portfolioBuilder.updateEducation(${edu.id}, 'school', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="University name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                        <input type="text" value="${edu.degree}" onchange="portfolioBuilder.updateEducation(${edu.id}, 'degree', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="B.Sc, M.Sc, etc.">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                        <input type="text" value="${edu.field}" onchange="portfolioBuilder.updateEducation(${edu.id}, 'field', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Computer Science">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Start</label>
                            <input type="text" value="${edu.start}" onchange="portfolioBuilder.updateEducation(${edu.id}, 'start', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="2018">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">End</label>
                            <input type="text" value="${edu.end}" onchange="portfolioBuilder.updateEducation(${edu.id}, 'end', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="2022">
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea rows="3" onchange="portfolioBuilder.updateEducation(${edu.id}, 'description', this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Highlights, courses, GPA, etc.">${edu.description}</textarea>
                </div>
            </div>
        `;
        container.appendChild(eduDiv);
    }
    
    updateEducation(id, field, value) {
        const edu = this.portfolioData.education.find(e => e.id === id);
        if (edu) {
            edu[field] = value;
            this.updatePreview();
        }
    }
    
    removeEducation(id) {
        this.portfolioData.education = this.portfolioData.education.filter(e => e.id !== id);
        const element = document.querySelector(`[data-edu-id=\"${id}\"]`);
        if (element) element.remove();
        this.updatePreview();
        this.updateCompletionStatus();
    }
    
    // Services
    addService() {
        const id = Date.now();
        const s = { id, title: '', description: '', icon: 'fas fa-star' };
        this.portfolioData.services.push(s);
        this.renderService(s);
        this.updateCompletionStatus();
    }
    renderService(s) {
        const c = document.getElementById('services-container');
        if (!c) return;
        const el = document.createElement('div');
        el.className = 'relative project-card';
        el.dataset.serviceId = s.id;
        el.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeService(${s.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" value="${s.title}" onchange="portfolioBuilder.updateService(${s.id}, 'title', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="UI/UX Design">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Icon Class</label>
                    <input type="text" value="${s.icon}" onchange="portfolioBuilder.updateService(${s.id}, 'icon', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="fas fa-star">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input type="text" value="${s.description}" onchange="portfolioBuilder.updateService(${s.id}, 'description', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Short description">
                </div>
            </div>`;
        c.appendChild(el);
    }
    updateService(id, field, value) {
        const s = this.portfolioData.services.find(x => x.id === id);
        if (s) { s[field] = value; this.updatePreview(); }
    }
    removeService(id) {
        this.portfolioData.services = this.portfolioData.services.filter(x => x.id !== id);
        document.querySelector(`[data-service-id="${id}"]`)?.remove();
        this.updatePreview(); this.updateCompletionStatus();
    }

    // Testimonials
    addTestimonial() {
        const id = Date.now();
        const t = { id, name: '', role: '', quote: '', avatar: null };
        this.portfolioData.testimonials.push(t);
        this.renderTestimonial(t);
        this.updateCompletionStatus();
    }
    renderTestimonial(t) {
        const c = document.getElementById('testimonials-container');
        if (!c) return;
        const el = document.createElement('div');
        el.className = 'relative project-card';
        el.dataset.testimonialId = t.id;
        el.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeTestimonial(${t.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                    <input type="text" value="${t.quote}" onchange="portfolioBuilder.updateTestimonial(${t.id}, 'quote', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="They delivered excellent results...">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" value="${t.name}" onchange="portfolioBuilder.updateTestimonial(${t.id}, 'name', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Jane Doe">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input type="text" value="${t.role}" onchange="portfolioBuilder.updateTestimonial(${t.id}, 'role', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="CEO, Company">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                    <input type="file" accept="image/*" onchange="portfolioBuilder.uploadImage(event, ${t.id}, 'testimonials')" class="w-full">
                </div>
            </div>`;
        c.appendChild(el);
    }
    updateTestimonial(id, field, value) {
        const t = this.portfolioData.testimonials.find(x => x.id === id);
        if (t) { t[field] = value; this.updatePreview(); }
    }
    removeTestimonial(id) {
        this.portfolioData.testimonials = this.portfolioData.testimonials.filter(x => x.id !== id);
        document.querySelector(`[data-testimonial-id="${id}"]`)?.remove();
        this.updatePreview(); this.updateCompletionStatus();
    }

    // Process
    addProcessStep() {
        const id = Date.now();
        const p = { id, title: '', description: '' };
        this.portfolioData.process.push(p);
        this.renderProcessStep(p);
        this.updateCompletionStatus();
    }
    renderProcessStep(p) {
        const c = document.getElementById('process-container');
        if (!c) return;
        const el = document.createElement('div');
        el.className = 'relative project-card';
        el.dataset.processId = p.id;
        el.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeProcessStep(${p.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input type="text" value="${p.title}" onchange="portfolioBuilder.updateProcessStep(${p.id}, 'title', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Discover & Research">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input type="text" value="${p.description}" onchange="portfolioBuilder.updateProcessStep(${p.id}, 'description', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Brief explanation">
                </div>
            </div>`;
        c.appendChild(el);
    }
    updateProcessStep(id, field, value) {
        const p = this.portfolioData.process.find(x => x.id === id);
        if (p) { p[field] = value; this.updatePreview(); }
    }
    removeProcessStep(id) {
        this.portfolioData.process = this.portfolioData.process.filter(x => x.id !== id);
        document.querySelector(`[data-process-id="${id}"]`)?.remove();
        this.updatePreview(); this.updateCompletionStatus();
    }

    // Highlights
    addHighlight() {
        const id = Date.now();
        const h = { id, value: '', label: '' };
        this.portfolioData.highlights.push(h);
        this.renderHighlight(h);
        this.updateCompletionStatus();
    }
    renderHighlight(h) {
        const c = document.getElementById('highlights-container');
        if (!c) return;
        const el = document.createElement('div');
        el.className = 'relative project-card';
        el.dataset.highlightId = h.id;
        el.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeHighlight(${h.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Value</label>
                    <input type="text" value="${h.value}" onchange="portfolioBuilder.updateHighlight(${h.id}, 'value', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="98%">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Label</label>
                    <input type="text" value="${h.label}" onchange="portfolioBuilder.updateHighlight(${h.id}, 'label', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Branding">
                </div>
            </div>`;
        c.appendChild(el);
    }
    updateHighlight(id, field, value) {
        const h = this.portfolioData.highlights.find(x => x.id === id);
        if (h) { h[field] = value; this.updatePreview(); }
    }
    removeHighlight(id) {
        this.portfolioData.highlights = this.portfolioData.highlights.filter(x => x.id !== id);
        document.querySelector(`[data-highlight-id="${id}"]`)?.remove();
        this.updatePreview(); this.updateCompletionStatus();
    }

    // Logos
    addLogo() {
        const id = Date.now();
        const l = { id, label: '', image: null };
        this.portfolioData.logos.push(l);
        this.renderLogo(l);
        this.updateCompletionStatus();
    }
    renderLogo(l) {
        const c = document.getElementById('logos-container');
        if (!c) return;
        const el = document.createElement('div');
        el.className = 'relative project-card';
        el.dataset.logoId = l.id;
        el.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeLogo(${l.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Label</label>
                    <input type="text" value="${l.label}" onchange="portfolioBuilder.updateLogo(${l.id}, 'label', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Company Name">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Logo Image</label>
                    <input type="file" accept="image/*" onchange="portfolioBuilder.uploadImage(event, ${l.id}, 'logos')" class="w-full">
                </div>
                <div>
                    ${l.image ? `<img src='${l.image}' class='h-10 object-contain'/>` : '<div class="h-10 bg-gray-100"></div>'}
                </div>
            </div>`;
        c.appendChild(el);
    }
    updateLogo(id, field, value) {
        const l = this.portfolioData.logos.find(x => x.id === id);
        if (l) { l[field] = value; this.updatePreview(); }
    }
    removeLogo(id) {
        this.portfolioData.logos = this.portfolioData.logos.filter(x => x.id !== id);
        document.querySelector(`[data-logo-id="${id}"]`)?.remove();
        this.updatePreview(); this.updateCompletionStatus();
    }

    // Gallery
    addGalleryItem() {
        const id = Date.now();
        const g = { id, image: null, caption: '' };
        this.portfolioData.gallery.push(g);
        this.renderGalleryItem(g);
        this.updateCompletionStatus();
    }
    renderGalleryItem(g) {
        const c = document.getElementById('gallery-container');
        if (!c) return;
        const el = document.createElement('div');
        el.className = 'relative project-card';
        el.dataset.galleryId = g.id;
        el.innerHTML = `
            <button type="button" class="remove-btn" onclick="portfolioBuilder.removeGalleryItem(${g.id})">×</button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <input type="file" accept="image/*" onchange="portfolioBuilder.uploadImage(event, ${g.id}, 'gallery')" class="w-full">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                    <input type="text" value="${g.caption}" onchange="portfolioBuilder.updateGalleryItem(${g.id}, 'caption', this.value)" class="w-full px-3 py-2 border rounded-md" placeholder="Caption">
                </div>
            </div>`;
        c.appendChild(el);
    }
    updateGalleryItem(id, field, value) {
        const g = this.portfolioData.gallery.find(x => x.id === id);
        if (g) { g[field] = value; this.updatePreview(); }
    }
    removeGalleryItem(id) {
        this.portfolioData.gallery = this.portfolioData.gallery.filter(x => x.id !== id);
        document.querySelector(`[data-gallery-id="${id}"]`)?.remove();
        this.updatePreview(); this.updateCompletionStatus();
    }

    // Generic image uploader for dynamic lists
    uploadImage(event, id, collection) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const arr = this.portfolioData[collection];
            const item = arr.find(x => x.id === id);
            if (!item) return;
            if (collection === 'testimonials') item.avatar = e.target.result;
            if (collection === 'logos') item.image = e.target.result;
            if (collection === 'gallery') item.image = e.target.result;
            this.updatePreview();
        };
        reader.readAsDataURL(file);
    }
    
    updateCompletionStatus() {
        const totalFields = 8;
        let completedFields = 0;
        
        if (this.portfolioData.personal.fullName) completedFields++;
        if (this.portfolioData.personal.title) completedFields++;
        if (this.portfolioData.personal.bio) completedFields++;
        if (this.portfolioData.personal.email) completedFields++;
        if (this.portfolioData.about.skills.length > 0) completedFields++;
        if (this.portfolioData.projects.length > 0) completedFields++;
        if (this.portfolioData.social.length > 0) completedFields++;
        if (this.portfolioData.about.description) completedFields++;
        
        const percentage = Math.round((completedFields / totalFields) * 100);
        const statusEl = document.getElementById('completion-status');
        if (statusEl) {
            statusEl.textContent = `${percentage}% Complete`;
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('portfolioBuilderData', JSON.stringify(this.portfolioData));
        alert('Portfolio data saved!');
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('portfolioBuilderData');
        if (saved) {
            this.portfolioData = JSON.parse(saved);
            this.populateFields();
            this.updatePreview();
            alert('Data loaded!');
        } else {
            alert('No saved data found.');
        }
    }
    
    populateFields() {
        Object.keys(this.portfolioData.personal).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = this.portfolioData.personal[key] || '';
        });
        
        const aboutDesc = document.getElementById('aboutDescription');
        if (aboutDesc) aboutDesc.value = this.portfolioData.about.description || '';
        
        // Clear dynamic containers before re-rendering
        const containersToClear = ['skills-container', 'certifications-container', 'projects-container', 'experience-container', 'education-container', 'social-container', 'services-container', 'testimonials-container', 'process-container', 'highlights-container', 'logos-container', 'gallery-container'];
        containersToClear.forEach(id => { const c = document.getElementById(id); if (c) c.innerHTML = ''; });
        
        // Re-render dynamic sections
        this.portfolioData.about.skills.forEach(skill => this.renderSkill(skill));
        this.portfolioData.about.certifications.forEach(cert => this.renderCertification(cert));
        this.portfolioData.projects.forEach(project => this.renderProject(project));
        this.portfolioData.experience.forEach(exp => this.renderExperience(exp));
        this.portfolioData.education.forEach(edu => this.renderEducation(edu));
        this.portfolioData.social.forEach(social => this.renderSocialLink(social));
        this.portfolioData.services.forEach(s => this.renderService(s));
        this.portfolioData.testimonials.forEach(t => this.renderTestimonial(t));
        this.portfolioData.process.forEach(p => this.renderProcessStep(p));
        this.portfolioData.highlights.forEach(h => this.renderHighlight(h));
        this.portfolioData.logos.forEach(l => this.renderLogo(l));
        this.portfolioData.gallery.forEach(g => this.renderGalleryItem(g));
    }
    
    updatePreview() {
        const preview = document.getElementById('portfolio-preview');
        if (!preview) return;
        preview.innerHTML = this.getPreviewHTML();
    }
    
    // Generate template-specific HTML
    getPreviewHTML() {
        let html;
        switch (this.currentTemplate) {
            case 'minimal':
                html = this.renderTemplateMinimal();
                break;
            case 'creative':
                html = this.renderTemplateCreative();
                break;
            case 'professional':
                html = this.renderTemplateProfessional();
                break;
            case 'developer':
                html = this.renderTemplateDeveloper();
                break;
            case 'modern':
            default:
                html = this.renderTemplateModern();
        }
        // Clean up any escaped quotes that might have leaked into HTML attributes
        return html.replace(/\\"/g, '"');
    }
    
    // Section helpers (reused across templates)
    sectionAbout(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.about && (d.about.description || d.about.skills.length || d.about.certifications.length))) return '';
        return `
        <section class="${extraWrapClasses} max-w-6xl mx-auto px-6 py-10">
            <h2 class="text-2xl font-bold mb-6">About Me</h2>
            ${d.about.description ? `<p class=\"text-gray-700 mb-6\">${d.about.description}</p>` : ''}
            ${d.about.skills.length ? `
            <div class=\"mb-8\">
                <h3 class=\"text-xl font-semibold mb-4\">Skills</h3>
                <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                    ${d.about.skills.map(skill => `
                        <div>
                            <div class=\"flex justify-between mb-2\">
                                <span class=\"font-medium\">${skill.name}</span>
                                <span class=\"text-sm text-gray-600\">${skill.proficiency}%</span>
                            </div>
                            <div class=\"w-full bg-gray-200 rounded-full h-2\">
                                <div class=\"bg-blue-500 h-2 rounded-full\" style=\"width: ${skill.proficiency}%\"></div>
                            </div>
                        </div>`).join('')}
                </div>
            </div>` : ''}
            ${d.about.certifications.length ? `
            <div>
                <h3 class=\"text-xl font-semibold mb-4\">Certifications</h3>
                <ul class=\"list-disc pl-6 space-y-1 text-gray-700\">
                    ${d.about.certifications.map(c => `<li><span class='font-medium'>${c.name}</span>${c.issuer ? ` — ${c.issuer}` : ''}${c.year ? ` (${c.year})` : ''}</li>`).join('')}
                </ul>
            </div>` : ''}
        </section>`;
    }
    
    // Theme helpers for per-template styling
    getTheme() {
        switch (this.currentTemplate) {
            case 'developer':
                return {
                    surface: 'bg-[#0b1220] text-[#d0d7e2]',
                    heading: 'text-white',
                    muted: 'text-[#93a1b5]',
                    card: 'bg-[#111827] border border-[#1f2937] text-[#d0d7e2] shadow-sm',
                    pill: 'bg-[#111827] text-[#d0d7e2] border border-[#1f2937]'
                };
            case 'creative':
                return {
                    surface: 'bg-gradient-to-br from-pink-50 to-orange-50 text-slate-800',
                    heading: 'text-slate-900',
                    muted: 'text-slate-600',
                    card: 'bg-white border border-orange-100 shadow-sm',
                    pill: 'bg-white text-pink-600 border border-pink-200'
                };
            case 'professional':
                return {
                    surface: 'bg-slate-50 text-slate-800',
                    heading: 'text-slate-900',
                    muted: 'text-slate-600',
                    card: 'bg-white border border-slate-200 shadow-sm',
                    pill: 'bg-white text-slate-700 border border-slate-300'
                };
            case 'minimal':
                return {
                    surface: 'bg-white text-slate-800',
                    heading: 'text-slate-900',
                    muted: 'text-slate-600',
                    card: 'bg-white border border-slate-200',
                    pill: 'bg-white text-slate-700 border border-slate-300'
                };
            case 'modern':
            default:
                return {
                    surface: 'bg-gradient-to-b from-white to-slate-50 text-slate-800',
                    heading: 'text-slate-900',
                    muted: 'text-slate-600',
                    card: 'bg-white border border-slate-200 shadow',
                    pill: 'bg-blue-600 text-white'
                };
        }
    }
    
    sectionProjects(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.projects && d.projects.length)) return '';
        const t = this.getTheme();
        return `
        <section class="${extraWrapClasses} max-w-6xl mx-auto px-6 py-10">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${d.projects.map(project => `
                    <div class="rounded-xl p-6 ${t.card}">
                        <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                        <p class="${t.muted} mb-4">${project.description}</p>
                        ${project.technologies ? `<p class="text-sm text-blue-600 mb-4"><strong>Tech:</strong> ${project.technologies}</p>` : ''}
                        <div class="flex gap-3">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="text-blue-500 hover:underline">Live Demo</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="${this.currentTemplate==='developer' ? 'text-[#d0d7e2]' : 'text-slate-700'} hover:underline">GitHub</a>` : ''}
                        </div>
                    </div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionServices(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.services && d.services.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Services</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${d.services.map(s => `
                    <div class="rounded-xl p-6 ${t.card}">
                        <div class="text-2xl mb-2"><i class="${s.icon || 'fas fa-star'}"></i></div>
                        <h3 class="text-lg font-semibold">${s.title || ''}</h3>
                        <p class="${t.muted} mt-2">${s.description || ''}</p>
                    </div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionTestimonials(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.testimonials && d.testimonials.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Testimonials</h2>
            <div class="grid md:grid-cols-2 gap-6">
                ${d.testimonials.map(ti => `
                    <div class="rounded-xl p-6 ${t.card}">
                        <p class="italic">“${ti.quote || ''}”</p>
                        <div class="mt-4 flex items-center gap-3 ${t.muted}">
                            ${ti.avatar ? `<img src="${ti.avatar}" class="w-10 h-10 rounded-full object-cover"/>` : '<div class="w-10 h-10 rounded-full bg-gray-200"></div>'}
                            <div>
                                <div class="font-medium ${t.heading}">${ti.name || ''}</div>
                                <div class="text-sm ${t.muted}">${ti.role || ''}</div>
                            </div>
                        </div>
                    </div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionProcess(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.process && d.process.length)) return '';
        return `
        <section class=\"max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}\">
            <h2 class=\"text-2xl font-bold mb-6\">Process</h2>
            <ol class=\"space-y-4\">
                ${d.process.map((p, i) => `
                    <li class=\"bg-white border rounded-lg p-4\">
                        <div class=\"text-sm text-gray-500\">Step ${i+1}</div>
                        <div class=\"font-semibold\">${p.title || ''}</div>
                        <p class=\"text-gray-600\">${p.description || ''}</p>
                    </li>`).join('')}
            </ol>
        </section>`;
    }
    
    sectionHighlights(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.highlights && d.highlights.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${d.highlights.map(h => `<div class="rounded-xl p-4 text-center ${t.card}"><div class="text-3xl font-bold ${t.heading}">${h.value || ''}</div><div class="${t.muted}">${h.label || ''}</div></div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionLogos(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.logos && d.logos.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Trusted By</h2>
            <div class="flex flex-wrap gap-3 items-center">
                ${d.logos.map(l => `<div class="logo-pill ${t.card} ${this.currentTemplate==='developer' ? 'border-[#1f2937]' : ''}"><span class="${t.muted}">${l.label || ''}</span></div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionGallery(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.gallery && d.gallery.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Gallery</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                ${d.gallery.map(g => `<figure class='gallery-tile ${t.card}'><img src='${g.image}' class='w-full h-40 object-cover'/><figcaption class='p-2 text-sm ${t.muted}'>${g.caption || ''}</figcaption></figure>`).join('')}
            </div>
        </section>`;
    }
    
    sectionExperience(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.experience && d.experience.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Experience</h2>
            <div class="space-y-6">
                ${d.experience.map(exp => `
                    <div class="rounded-xl p-6 ${t.card}">
                        <h3 class="text-xl font-semibold ${t.heading}">${exp.role || ''}${(exp.role && exp.company) ? ' at ' : ''}${exp.company || ''}</h3>
                        <p class="text-sm ${t.muted} mb-2">${[exp.start, exp.end].filter(Boolean).join(' - ')}</p>
                        <p class="${t.muted}">${exp.description || ''}</p>
                    </div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionEducation(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!(d.sectionVisibility.education && d.education.length)) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <h2 class="text-2xl font-bold mb-6 ${t.heading}">Education</h2>
            <div class="space-y-6">
                ${d.education.map(edu => `
                    <div class="rounded-xl p-6 ${t.card}">
                        <h3 class="text-xl font-semibold ${t.heading}">${edu.degree || ''}${(edu.degree && edu.field) ? ' — ' : ''}${edu.field || ''}</h3>
                        <p class="text-sm ${t.muted} mb-1">${edu.school || ''}</p>
                        <p class="text-sm ${t.muted} mb-2">${[edu.start, edu.end].filter(Boolean).join(' - ')}</p>
                        <p class="${t.muted}">${edu.description || ''}</p>
                    </div>`).join('')}
            </div>
        </section>`;
    }
    
    sectionSocial(extraWrapClasses = '') {
        const d = this.portfolioData;
        if (!d.social.length) return '';
        const t = this.getTheme();
        return `
        <section class="max-w-6xl mx-auto px-6 py-10 ${extraWrapClasses}">
            <div class="flex flex-wrap justify-center gap-4">
                ${d.social.map(social => {
                    const icons = { github: 'fab fa-github', linkedin: 'fab fa-linkedin', twitter: 'fab fa-twitter', website: 'fas fa-globe' };
                    return `<a href="${social.url}" target="_blank" class="inline-flex items-center px-4 py-2 rounded-lg ${t.pill} hover:opacity-90"><i class="${icons[social.platform] || 'fas fa-link'} mr-2"></i>${social.label || social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}</a>`;
                }).join('')}
            </div>
        </section>`;
    }
    
    // Template variants
    renderTemplateModern() {
        const d = this.portfolioData;
        return `
        <div class="template-${this.currentTemplate} min-h-full">
            <section class="relative overflow-hidden">
                ${d.personal.heroImage ? `<img src="${d.personal.heroImage}" class="w-full h-64 object-cover" alt="Hero">` : ''}
                <div class="max-w-5xl mx-auto px-6 py-10">
                    <div class="grid md:grid-cols-3 gap-8 items-center">
                        <div class="md:col-span-2">
                            <div class="inline-flex items-center text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">${d.personal.availability || ''}</div>
                            <h1 class="text-4xl md:text-5xl font-extrabold mt-4">${d.personal.fullName || 'Your Name'}</h1>
                            <p class="accent text-xl mt-2">${d.personal.title || ''}</p>
                            <p class="text-gray-700 mt-4">${d.personal.tagline || d.personal.bio || ''}</p>
                            <div class="mt-6 flex flex-wrap gap-3">
                                ${d.personal.ctaPrimaryText ? `<a class="px-5 py-2 rounded-md bg-blue-600 text-white" href="${d.personal.ctaPrimaryUrl || '#'}" target="_blank">${d.personal.ctaPrimaryText}</a>` : ''}
                                ${d.personal.ctaSecondaryText ? `<a class="px-5 py-2 rounded-md border border-gray-300" href="${d.personal.ctaSecondaryUrl || '#'}" target="_blank">${d.personal.ctaSecondaryText}</a>` : ''}
                            </div>
                        </div>
                        <div class="justify-self-center">
                            ${d.personal.profilePhoto ? `<img src="${d.personal.profilePhoto}" class="w-40 h-40 rounded-full object-cover shadow"/>` : `<div class="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-3xl text-gray-500"></i></div>`}
                        </div>
                    </div>
                </div>
            </section>
            ${this.sectionAbout()}
            ${this.sectionHighlights()}
            ${this.sectionProjects()}
            ${this.sectionServices()}
            ${this.sectionProcess()}
            ${this.sectionTestimonials()}
            ${this.sectionExperience()}
            ${this.sectionEducation()}
            ${this.sectionLogos()}
            ${this.sectionGallery()}
            ${this.sectionSocial()}
        </div>`;
    }
    
    renderTemplateMinimal() {
        const d = this.portfolioData;
        return `
        <div class="template-${this.currentTemplate} min-h-full p-10">
            <header class="max-w-4xl mx-auto">
                <h1 class="text-5xl font-serif">${d.personal.fullName || 'Your Name'}</h1>
                <p class="text-gray-600 mt-2">${d.personal.title || ''}</p>
                <p class="mt-6 text-gray-700">${d.personal.bio || ''}</p>
            </header>
            ${this.sectionHighlights('max-w-4xl mx-auto mt-10')}
            ${this.sectionProjects('max-w-5xl mx-auto mt-12')}
            ${this.sectionServices('max-w-5xl mx-auto mt-12')}
            ${this.sectionTestimonials('max-w-4xl mx-auto mt-12')}
            ${this.sectionExperience('max-w-4xl mx-auto mt-12')}
            ${this.sectionEducation('max-w-4xl mx-auto mt-12')}
            ${this.sectionGallery('max-w-5xl mx-auto mt-12')}
            ${this.sectionSocial('max-w-4xl mx-auto mt-12 text-center')}
        </div>`;
    }
    
    renderTemplateCreative() {
        const d = this.portfolioData;
        return `
        <div class="template-${this.currentTemplate} min-h-full">
            <section class="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                <div class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 class="text-5xl font-extrabold">${d.personal.fullName || 'Your Name'}</h1>
                        <p class="mt-2 text-2xl">${d.personal.title || ''}</p>
                        <p class="mt-4 opacity-90">${d.personal.tagline || d.personal.bio || ''}</p>
                        <div class="mt-6 flex gap-3">
                            ${d.personal.ctaPrimaryText ? `<a class="px-5 py-2 rounded-lg bg-black/20 border border-white/30" href="${d.personal.ctaPrimaryUrl || '#'}" target="_blank">${d.personal.ctaPrimaryText}</a>` : ''}
                            ${d.personal.ctaSecondaryText ? `<a class="px-5 py-2 rounded-lg bg-white text-pink-600" href="${d.personal.ctaSecondaryUrl || '#'}" target="_blank">${d.personal.ctaSecondaryText}</a>` : ''}
                        </div>
                    </div>
                    <div class="justify-self-center">
                        ${d.personal.profilePhoto ? `<img src="${d.personal.profilePhoto}" class="w-48 h-48 rounded-3xl object-cover shadow-2xl ring-4 ring-white/30"/>` : ''}
                    </div>
                </div>
            </section>
            <div class="max-w-6xl mx-auto px-6">
                ${this.sectionHighlights('mt-10')}
                ${this.sectionProjects('mt-12')}
                ${this.sectionServices('mt-12')}
                ${this.sectionTestimonials('mt-12')}
                ${this.sectionGallery('mt-12')}
                ${this.sectionSocial('mt-12 text-center')}
            </div>
        </div>`;
    }
    
    renderTemplateProfessional() {
        const d = this.portfolioData;
        return `
        <div class="template-${this.currentTemplate} min-h-full">
            <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
                <aside class="md:col-span-1 bg-white rounded-lg shadow p-6">
                    ${d.personal.profilePhoto ? `<img src="${d.personal.profilePhoto}" class="w-28 h-28 rounded-full object-cover mb-4"/>` : ''}
                    <h1 class="text-2xl font-bold">${d.personal.fullName || ''}</h1>
                    <p class="text-gray-600">${d.personal.title || ''}</p>
                    <div class="mt-4 space-y-1 text-sm text-gray-700">
                        ${d.personal.email ? `<div><i class='fas fa-envelope mr-2'></i>${d.personal.email}</div>` : ''}
                        ${d.personal.phone ? `<div><i class='fas fa-phone mr-2'></i>${d.personal.phone}</div>` : ''}
                        ${d.personal.location ? `<div><i class='fas fa-map-marker-alt mr-2'></i>${d.personal.location}</div>` : ''}
                        ${d.personal.website ? `<div><i class='fas fa-globe mr-2'></i>${d.personal.website}</div>` : ''}
                    </div>
                </aside>
                <main class="md:col-span-2 space-y-12">
                    ${this.sectionAbout()}
                    ${this.sectionHighlights()}
                    ${this.sectionProjects()}
                    ${this.sectionExperience()}
                    ${this.sectionEducation()}
                    ${this.sectionServices()}
                    ${this.sectionTestimonials()}
                    ${this.sectionGallery()}
                    ${this.sectionSocial()}
                </main>
            </div>
        </div>`;
    }
    
    renderTemplateDeveloper() {
        const d = this.portfolioData;
        const t = this.getTheme();
        return `
        <div class="template-${this.currentTemplate} min-h-full ${t.surface}">
            <div class="max-w-6xl mx-auto px-6 py-10">
                <div class="flex items-center gap-6">
                    ${d.personal.profilePhoto ? `<img src="${d.personal.profilePhoto}" class="w-24 h-24 rounded-lg object-cover"/>` : ''}
                    <div>
                        <h1 class="text-3xl font-bold ${t.heading}">${d.personal.fullName || ''}</h1>
                        <p class="text-emerald-400">${d.personal.title || ''}</p>
                    </div>
                </div>
                ${this.sectionHighlights('mt-8')}
                ${this.sectionProjects('mt-10')}
                ${this.sectionServices('mt-10')}
                ${this.sectionExperience('mt-10')}
                ${this.sectionEducation('mt-10')}
                ${this.sectionSocial('mt-10')}
            </div>
        </div>`;
    }
    
    // Open live preview in a new tab
    openLivePreview() {
        const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${this.portfolioData.personal.fullName || 'Portfolio'}</title><script src="https://cdn.tailwindcss.com"></script><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"><style>body{font-family:Inter,ui-sans-serif,system-ui,Arial}</style></head><body>${this.getPreviewHTML()}</body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }
    
    downloadHTML() {
        const preview = document.getElementById('portfolio-preview');
        if (!preview) return;
        
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.portfolioData.personal.fullName || 'Portfolio'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .template-modern { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .template-minimal { background: white; color: #333; }
        .template-creative { background: #f7fafc; color: #2d3748; }
        .template-professional { background: #f8f9fa; color: #212529; }
        .template-developer { background: #0d1117; color: #c9d1d9; font-family: monospace; }
    </style>
</head>
<body>
    ${preview.innerHTML}
</body>
</html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.portfolioData.personal.fullName?.replace(/\s+/g, '_') || 'portfolio'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    downloadPDF() {
        alert('PDF download feature will open print dialog. Please select "Save as PDF" from your browser print options.');
        window.print();
    }
}

// Initialize the portfolio builder when the page loads
// Ensure global access for inline handlers
document.addEventListener('DOMContentLoaded', function() {
    window.portfolioBuilder = new PortfolioBuilder();
});