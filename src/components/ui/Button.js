class BlogButton extends HTMLElement {
  static observedAttributes = ["type", "size", "loading", "disabled"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const type = this.getAttribute("type") || "primary";
    const size = this.getAttribute("size") || "medium";
    const loading = this.hasAttribute("loading");
    const disabled = this.hasAttribute("disabled");
    const text = this.getAttribute("text") || this.textContent.trim();

    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: inline-block;
        }
        
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        
        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* 类型 */
        .button-primary {
          background: #3b82f6;
          color: white;
        }
        
        .button-primary:hover:not(:disabled) {
          background: #2563eb;
        }
        
        .button-secondary {
          background: #f1f5f9;
          color: #475569;
        }
        
        .button-secondary:hover:not(:disabled) {
          background: #e2e8f0;
        }
        
        /* 尺寸 */
        .button-small {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }
        
        .button-medium {
          padding: 0.5rem 1rem;
          font-size: 1rem;
        }
        
        .button-large {
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        }
        
        /* 加载动画 */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }
        
        .button-secondary .spinner {
          border: 2px solid rgba(71, 85, 105, 0.3);
          border-top-color: #475569;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* 图标 */
        .icon {
          display: inline-flex;
          align-items: center;
        }
      </style>
      
      <button class="button button-\${type} button-\${size}" \${disabled ? "disabled" : ""}>
        \${loading ? '<span class="spinner"></span>' : ""}
        \${text}
      </button>
    \`;
  }

  handleClick(event) {
    if (this.hasAttribute("disabled")) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // 触发自定义事件
    this.dispatchEvent(
      new CustomEvent("blog-button-click", {
        bubbles: true,
        composed: true,
        detail: { button: this },
      })
    );
  }

  // 公共方法
  setLoading(loading) {
    if (loading) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
}

// 注册自定义元素
if (!customElements.get("blog-button")) {
  customElements.define("blog-button", BlogButton);
}

export default BlogButton;
