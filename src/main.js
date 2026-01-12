import "./assets/styles/main.css";

class App {
    constructor() {
        this.appContainer = document.getElementById("app");
        this.init();
    }

    async init() {
        console.log("🚀 应用启动中...");

        try {
            // 1. 初始化基础模块
            await this.initModules();

            // 2. 渲染应用
            await this.render();

            // 3. 绑定事件
            this.bindEvents();

            // 4. 完成启动
            this.onReady();

        } catch (error) {
            console.error("应用启动失败:", error);
            this.showError("应用启动失败，请刷新页面");
        }
    }

    async initModules() {
        // 这里以后会初始化各种模块
        console.log("初始化模块...");
        return new Promise((resolve) => setTimeout(resolve, 500));
    }

    async render() {
        this.appContainer.innerHTML = `
      <header class="header">
        <div class="container">
          <div class="flex" style="justify-content: space-between; align-items: center; padding: 1rem 0;">
            <div class="flex" style="align-items: center; gap: 1rem;">
              <i class="fas fa-blog" style="color: var(--primary-color); font-size: 1.5rem;"></i>
              <h1 style="font-size: 1.25rem; font-weight: 600;">个人博客</h1>
            </div>
            <nav class="flex" style="gap: 1.5rem;">
              <a href="#" class="nav-link" data-page="home">
                <i class="fas fa-home"></i> 首页
              </a>
              <a href="#" class="nav-link" data-page="explore">
                <i class="fas fa-compass"></i> 发现
              </a>
              <a href="#" class="nav-link" data-page="articles">
                <i class="fas fa-newspaper"></i> 文章
              </a>
              <a href="#" class="nav-link" data-page="profile">
                <i class="fas fa-user"></i> 我的
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main class="main">
        <div class="container" style="padding: 2rem 0;">
          <div class="hero">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">欢迎来到个人博客</h2>
            <p style="color: #64748b; font-size: 1.125rem; margin-bottom: 2rem;">
              分享技术，记录成长，连接开发者
            </p>
            <div class="flex" style="gap: 1rem;">
              <button class="btn btn-primary" id="exploreBtn">
                <i class="fas fa-rocket"></i> 开始探索
              </button>
              <button class="btn" style="background: #f1f5f9; color: #475569;">
                <i class="fas fa-book"></i> 查看文档
              </button>
            </div>
          </div>

          <div class="features" style="margin-top: 4rem;">
            <h3 style="text-align: center; margin-bottom: 2rem; font-size: 1.5rem;">核心功能</h3>
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
              <div class="card">
                <div style="width: 48px; height: 48px; background: #dbeafe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                  <i class="fas fa-user-edit" style="color: var(--primary-color); font-size: 1.25rem;"></i>
                </div>
                <h4 style="margin-bottom: 0.5rem;">个人主页</h4>
                <p style="color: #64748b;">展示你的技术栈、项目和成就</p>
              </div>
              
              <div class="card">
                <div style="width: 48px; height: 48px; background: #ede9fe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                  <i class="fas fa-pen-nib" style="color: var(--secondary-color); font-size: 1.25rem;"></i>
                </div>
                <h4 style="margin-bottom: 0.5rem;">技术文章</h4>
                <p style="color: #64748b;">分享你的技术见解和学习心得</p>
              </div>
              
              <div class="card">
                <div style="width: 48px; height: 48px; background: #fce7f3; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                  <i class="fas fa-comments" style="color: #db2777; font-size: 1.25rem;"></i>
                </div>
                <h4 style="margin-bottom: 0.5rem;">社交互动</h4>
                <p style="color: #64748b;">关注其他开发者，实时交流</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="footer" style="margin-top: 4rem; padding: 2rem 0; background: #f1f5f9;">
        <div class="container">
          <div style="text-align: center; color: #64748b;">
            <p>© 2023 个人博客项目 - 前端开发练习</p>
            <p style="margin-top: 0.5rem; font-size: 0.875rem;">使用 HTML、CSS、JavaScript 构建</p>
          </div>
        </div>
      </footer>
    `;

        // 添加额外样式
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement("style");
        style.textContent = `
      .header {
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav-link {
        text-decoration: none;
        color: #475569;
        font-weight: 500;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .nav-link:hover {
        color: var(--primary-color);
        background: #f1f5f9;
      }
      
      .hero {
        text-align: center;
        padding: 3rem 0;
      }
      
      .card {
        transition: transform 0.3s, box-shadow 0.3s;
        border: 1px solid #e2e8f0;
      }
      
      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }
      
      .footer {
        border-top: 1px solid #e2e8f0;
      }
    `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // 导航点击
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                this.navigateTo(page);
            });
        });

        // 探索按钮
        document.getElementById("exploreBtn").addEventListener("click", () => {
            this.showMessage("开始探索功能开发中...");
        });

        // 路由变化
        window.addEventListener("popstate", () => {
            this.handleRouteChange();
        });
    }

    navigateTo(page) {
        console.log("导航到页面:", page);
        history.pushState({ page }, `${page}页面`, `/#${page}`);
        this.showMessage(`切换到${page}页面`);
    }

    handleRouteChange() {
        console.log("路由变化");
    }

    showMessage(text) {
        const message = document.createElement("div");
        message.textContent = text;
        message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = "slideOut 0.3s ease";
            setTimeout(() => message.remove(), 300);
        }, 2000);

        // 添加动画样式
        if (!document.querySelector("#message-animations")) {
            const style = document.createElement("style");
            style.id = "message-animations";
            style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
            document.head.appendChild(style);
        }
    }

    showError(message) {
        this.appContainer.innerHTML = `
      <div style="padding: 4rem 2rem; text-align: center;">
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger-color); margin-bottom: 1rem;"></i>
        <h2 style="margin-bottom: 1rem;">出错了</h2>
        <p style="color: #64748b; margin-bottom: 2rem;">${message}</p>
        <button class="btn btn-primary" onclick="location.reload()">
          <i class="fas fa-redo"></i> 重新加载
        </button>
      </div>
    `;
    }

    onReady() {
        console.log("✅ 应用启动完成");

        // 移除加载状态
        document.querySelectorAll(".loading").forEach((el) => el.remove());

        // 发送应用就绪事件
        window.dispatchEvent(new Event("app:ready"));
    }
}

// 启动应用
document.addEventListener("DOMContentLoaded", () => {
    window.app = new App();
});

// 注意：这里不再有额外的右大括号 `}`