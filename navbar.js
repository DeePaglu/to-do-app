class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .logo {
                    transition: transform 0.3s ease;
                }
                
                .logo:hover {
                    transform: scale(1.05);
                }
            </style>
            <nav class="text-white py-4">
                <div class="nav-container px-4 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <i data-feather="check-circle" class="w-6 h-6"></i>
                        <h1 class="text-xl font-bold logo">Tasky McTaskface</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="#" class="hover:text-blue-100 transition duration-200">
                            <i data-feather="user" class="w-5 h-5"></i>
                        </a>
                        <a href="#" class="hover:text-blue-100 transition duration-200">
                            <i data-feather="settings" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);