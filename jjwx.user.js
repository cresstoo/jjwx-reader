// ==UserScript==
// @name         晋江文学城阅读页面美化
// @namespace    http://tampermonkey.net/
// @version      12.0
// @description  现代简洁阅读体验，统一布局与样式，支持多主题配色和字体调整
// @author       cress
// @match        https://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
// @icon         https://s2.loli.net/2025/03/17/F1Hn6gWdU4l3ezS.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        /* ==================== 全局重置 ==================== */
        /* 强力重置所有原站点样式 */
        html, body {
            background-color: #f8f9fa !important;
            font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif !important;
            color: #333 !important;
            line-height: 1.8 !important;
            text-rendering: optimizeLegibility !important;
            -webkit-font-smoothing: antialiased !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            overflow-x: hidden !important;
        }
        
        /* 彻底重置所有元素 */
        * {
            box-shadow: none !important;
            text-shadow: none !important;
            border-radius: 0 !important;
            font-family: inherit !important;
        }
        
        /* 重置所有默认边距 */
        div, p, h1, h2, h3, h4, h5, span, table, tr, td, a, font {
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            line-height: inherit !important;
            color: inherit !important; /* 使用继承的颜色，而不是固定颜色 */
        }
        
        /* ==================== 主要布局容器 ==================== */
        /* 核心：强制使用单列布局，隐藏右侧列 */
        #oneboolt {
            display: none !important;
        }

        /* 隐藏所有原始元素 */
        .noveltitle:not(.jj-novel-header),
        .novelbody:not(.jj-novel-content),
        .noveltext:not(.jj-novel-content),
        .readtitle:not(.jj-novel-header),
        .readtd:not(.jj-novel-content),
        table[width="984"],
        table[width="100%"],
        #comment_list, #publishcomment,
        td:has(> #comment_list),
        .readcontrolbar, .uninterested-hide,
        .danmu, .danmu_row, #danmu_main, .danmu_total_str,
        marquee, iframe, #qrCodeDiv,
        #footer, div#footer, body > div#footer,
        div[style*="z-index:333333"],
        div.footer, .copyright, #copyright, 
        .bottomlinks, #sitebottom, 
        div[class*="footer"],
        table[style*="z-index:333333"],
        div[align="center"]:has(> table):nth-last-of-type(1),
        div[align="center"]:has(> table):nth-last-of-type(2) {
            display: none !important;
            visibility: hidden !important;
            max-height: 0 !important;
            overflow: hidden !important;
            opacity: 0 !important;
        }
        
        /* 隐藏插入书签按钮和收藏区域 - 更精确的选择器 */
        div[align="right"]:has(> div[style*="float:right"]),
        div[style*="float:right"][style*="height: 25px"],
        div:has(> img[src*="bookmark.gif"]),
        img[src*="bookmark.gif"],
        span.favorite_novel, 
        span[id*="favorite_"],
        span[id="report_action"], 
        span[id="yrt3"],
        div[style*="width: 100%; text-align: center"]:has(span[id*="favorite_"]),
        div[style*="width: 100%; text-align: center"]:has(span[id="report_action"]),
        div[id="float_favorite"], 
        div[id="mongolia_layer"],
        div[id="report_box"],
        div[id="favoriteshow_2"],
        div[id*="favoriteshow_"],
        span[id="chapterJurisdiction"],
        font[color="#009900"]:has(> span.favorite_novel),
        div.float_favorite,
        a[href*="freegold"],
        script:contains("displayyrt"),
        button[onclick*="FavoriteClass"],
        div[class*="addFavoritClass"] {
            display: none !important;
            visibility: hidden !important;
            max-height: 0 !important;
            overflow: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
            z-index: -1 !important;
    width: 0 !important;
            height: 0 !important;
        }
        
        /* 隐藏原始的返回顶部按钮 */
        a[href="#top"], 
        a[href="javascript:scroll(0,0)"],
        a[onclick*="scroll(0,0)"],
        #jj-top-link,
        a[id="booktext_top"],
        [onclick*="window.scrollTo"],
        a[href^="javascript"][onclick*="window.scroll"],
        div[style*="position: fixed"][style*="right:"][style*="bottom:"][style*="cursor: pointer"][style*="opacity"][title*="返回顶部"],
        div[style*="position: fixed"][style*="right:"][style*="bottom:"][style*="cursor: pointer"]:not(.back-to-top),
        div[style*="position:fixed"][style*="right:"][style*="bottom:"][style*="cursor:pointer"]:not(.back-to-top),
        div[style*="width: 18px"][style*="line-height: 1.2"][style*="position: fixed"][style*="right: 10px"],
        div[style*="background-color: rgb(0, 0, 0)"][style*="position: fixed"][title="返回顶部"] {
    display: none !important;
    visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
        
        /* 正文容器 */
        .jj-container {
            max-width: 800px !important;
            margin: 20px auto !important;
    padding: 0 !important;
            background-color: #fff !important;
            box-shadow: 0 2px 12px rgba(0,0,0,0.05) !important;
            border-radius: 8px !important;
            overflow: hidden !important;
        }

        /* 小说标题区域 - 单行布局 */
        .jj-novel-header {
            padding: 15px 40px !important;
            text-align: left !important;
            border-bottom: 1px solid #E0E0E0 !important;
            display: flex !important;
            align-items: center !important;
            gap: 15px !important;
        }
        
        /* 小说标题 */
        .jj-novel-title {
            font-size: 18px !important;
            font-weight: 700 !important;
            color: #222 !important;
            margin: 0 !important;
            flex-shrink: 0 !important;
        }
        
        /* 作者信息 */
        .jj-novel-author {
            font-size: 18px !important;
            color: #666 !important;
            margin: 0 !important;
            flex-shrink: 0 !important;
        }
        
        /* 正文内容区域 - 局左排版 */
        .jj-novel-content {
            padding: 35px 40px !important;
            text-align: left !important;
        }
        
        /* 章节导航区域 - 居中 */
        .jj-chapter-nav {
            padding: 25px 0 !important;
            text-align: center !important;
            border-top: 1px solid #E0E0E0 !important;
        }
        
        /* ==================== 元素样式 ==================== */
        /* 正文段落 */
        .jj-novel-content p {
            margin: 1em 0 !important;
            text-indent: 2em !important;
            font-size: 18px !important;
            line-height: 2 !important;
            color: #2c3e50 !important;
            letter-spacing: 0.02em !important;
        }
        
        /* 作者有话说基础样式 */
        .jj-author-note,
        #note_danmu_wrapper,
        .note_main,
        .note_content {
            margin: 20px 0 !important;
            padding: 20px 25px !important;
            border-radius: 8px !important;
            font-size: 16px !important;
            line-height: 1.7 !important;
            transition: all 0.3s ease !important;
        }

        /* 默认主题作者有话说 */
        .theme-default .jj-author-note,
        .theme-default #note_danmu_wrapper,
        .theme-default .note_main,
        .theme-default .note_content {
            background-color: #E5E5E5 !important;
            color: #333333 !important;
            border: 1px solid #D8D8D8 !important;
        }

        /* 护眼主题作者有话说 */
        .theme-eye-care .jj-author-note,
        .theme-eye-care #note_danmu_wrapper,
        .theme-eye-care .note_main,
        .theme-eye-care .note_content {
            background-color: #D8E5C0 !important;
            color: #2C3E50 !important;
            border: 1px solid #C5D4A9 !important;
        }

        /* 专注主题作者有话说 */
        .theme-focus .jj-author-note,
        .theme-focus #note_danmu_wrapper,
        .theme-focus .note_main,
        .theme-focus .note_content {
            background-color: #F5ECD8 !important;
            color: #3C3C3C !important;
            border: 1px solid #E6D5B8 !important;
        }

        /* 夜间主题作者有话说 */
        .theme-dark .jj-author-note,
        .theme-dark #note_danmu_wrapper,
        .theme-dark .note_main,
        .theme-dark .note_content {
            background-color: #2D2D30 !important;
            color: #FFFFFF !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        /* 导航链接 */
        .jj-nav-link {
            display: inline-block !important;
            margin: 0 15px !important;
            padding: 10px 20px !important;
            background-color: #f8f9fa !important;
            border: 1px solid #e0e0e0 !important;
            border-radius: 4px !important;
            color: #444 !important;
            font-size: 15px !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
        }
        
        .jj-nav-link:hover {
            background-color: #e8f0fe !important;
            color: #0d66d0 !important;
            border-color: #c0d7fe !important;
        }
        
        /* 章节选择下拉列表 */
        .jj-chapter-select {
            display: inline-block !important;
            margin: 0 15px !important;
            padding: 10px 15px !important;
            background-color: #f8f9fa !important;
            border: 1px solid #e0e0e0 !important;
            border-radius: 4px !important;
            color: #444 !important;
            font-size: 15px !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
            min-width: 150px !important;
            text-align: center !important;
            outline: none !important;
            appearance: auto !important;
            -webkit-appearance: auto !important;
        }
        
        .jj-chapter-select:hover, .jj-chapter-select:focus {
            background-color: #e8f0fe !important;
            color: #0d66d0 !important;
            border-color: #c0d7fe !important;
        }
        
        /* 顶部导航栏样式 */
        #sitetop {
            position: relative !important;
            background-color: #fff !important;
            border-bottom: 1px solid #eee !important;
            padding: 8px 20px !important;
            font-size: 14px !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.03) !important;
            z-index: 1001 !important;
            width: 100% !important;
            box-sizing: border-box !important;
        }
        
        /* 左侧时间显示 */
        #sitetop #serverTime {
            color: #666 !important;
            font-size: 13px !important;
        }
        
        /* 右侧导航菜单 */
        #sitetop .toplogin {
            float: right !important;
        }
        
        /* 用户信息样式 */
        #sitetop #t_user_info {
            display: inline-block !important;
            margin-right: 15px !important;
        }
        
        #sitetop #t_user_info strong {
            font-weight: normal !important;
        }
        
        #sitetop #t_user_info a {
            color: #333 !important;
            text-decoration: none !important;
            transition: color 0.2s ease !important;
        }
        
        #sitetop #t_user_info a:hover {
            color: #1e88e5 !important;
        }
        
        /* 导航菜单样式 */
        #sitetop .cssMenu {
            margin: 0 !important;
            padding: 0 !important;
            list-style: none !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 15px !important;
        }
        
        #sitetop .cssMenu > li {
            position: relative !important;
            display: inline-block !important;
        }
        
        #sitetop .cssMenu > li > a {
            color: #333 !important;
            text-decoration: none !important;
            padding: 5px 8px !important;
            display: inline-block !important;
            transition: color 0.2s ease !important;
        }
        
        #sitetop .cssMenu > li > a:hover {
            color: #1e88e5 !important;
        }
        
        /* 下拉菜单样式 */
        #sitetop .cssMenu ul {
            display: none !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            background: #fff !important;
            border: 1px solid #eee !important;
            border-radius: 4px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            min-width: 150px !important;
            padding: 5px 0 !important;
            z-index: 1002 !important;
        }
        
        #sitetop .cssMenu li:hover > ul {
            display: block !important;
        }
        
        #sitetop .cssMenu ul li {
            display: block !important;
        }
        
        #sitetop .cssMenu ul a {
            color: #333 !important;
            text-decoration: none !important;
            padding: 8px 15px !important;
            display: block !important;
            transition: all 0.2s ease !important;
            font-size: 13px !important;
        }
        
        #sitetop .cssMenu ul a:hover {
            background-color: #f5f5f5 !important;
            color: #1e88e5 !important;
        }
        
        /* 签到按钮样式 */
        #sitetop #t_user_signin a {
            color: #ff5925 !important;
            text-decoration: none !important;
            padding: 2px 6px !important;
            border: 1px solid #ff5925 !important;
            border-radius: 2px !important;
            font-size: 13px !important;
            transition: all 0.2s ease !important;
        }
        
        #sitetop #t_user_signin a:hover {
            background-color: #ff5925 !important;
            color: #fff !important;
        }
        
        /* 客户号样式 */
        #sitetop .readerid {
            color: #666 !important;
            font-size: 13px !important;
            margin-left: 5px !important;
        }
        
        #sitetop .readerid a {
            color: #666 !important;
            text-decoration: none !important;
        }
        
        #sitetop .readerid img {
            vertical-align: middle !important;
            cursor: pointer !important;
        }
        
        /* 夜间模式适配 */
        .theme-dark #sitetop {
            background-color: #2D2D30 !important;
            border-bottom-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        .theme-dark #sitetop a,
        .theme-dark #sitetop #serverTime,
        .theme-dark #sitetop .readerid,
        .theme-dark #sitetop #t_user_info strong {
            color: #fff !important;
        }
        
        .theme-dark #sitetop .cssMenu ul {
            background-color: #2D2D30 !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        .theme-dark #sitetop .cssMenu ul a:hover {
            background-color: #4A4A4D !important;
        }
        
        /* 返回顶部按钮 */
        .back-to-top {
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 40px !important;
            height: 40px !important;
            background-color: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            color: #666 !important;
            text-align: center !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            z-index: 9999 !important;
            font-size: 20px !important;
            line-height: 40px !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        .back-to-top:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
        }

/* 工具栏触发按钮 */
.jj-toolbar-trigger {
    position: fixed !important;
    top: 50% !important;
    right: 30px !important;
    transform: translateY(-50%) !important;
    width: 40px !important;
    height: 40px !important;
    background-color: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-radius: 50% !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
    cursor: pointer !important;
    z-index: 9999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.2s ease !important;
    color: #666666 !important;
}

.jj-toolbar-trigger:hover {
    background-color: rgba(255, 255, 255, 1) !important;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15) !important;
    color: #333333 !important;
}

/* 夜间模式适配 */
.theme-dark .jj-toolbar-trigger {
    background-color: rgba(74, 74, 77, 0.95) !important;
    color: rgba(255, 255, 255, 0.8) !important;
}

.theme-dark .jj-toolbar-trigger:hover {
    background-color: rgba(74, 74, 77, 1) !important;
    color: rgba(255, 255, 255, 1) !important;
}
        /* 主题设置工具栏 */
        .jj-toolbar {
            position: fixed !important;
            top: 50% !important;
            right: 80px !important;
            transform: translateY(-50%) !important;
            width: 240px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
            padding: 15px !important;
            background-color: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border-radius: 12px !important;
            z-index: 9998 !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transform: translate(10px, -50%) !important;
        }

        .jj-toolbar.expanded {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translate(0, -50%) !important;
        }

        .jj-toolbar-trigger svg {
            width: 24px !important;
            height: 24px !important;
            fill: #666 !important;
            transition: transform 0.3s ease !important;
        }

        /* 字体选择组样式 */
        .jj-font-family-group {
            display: flex !important;
            gap: 6px !important;
            padding: 10px !important;
            background-color: rgba(0, 0, 0, 0.06) !important;
            border-radius: 6px !important;
        }

        .jj-font-family-btn {
            flex: 1 !important;
            padding: 6px 12px !important;
            border: none !important;
            background: none !important;
            color: #666 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
            position: relative !important;
        }

        .jj-font-family-btn[data-font*="PingFang"] {
            font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei" !important;
        }

        .jj-font-family-btn[data-font*="Songti"] {
            font-family: "Songti SC", SimSun, "宋体" !important;
        }

        .jj-font-family-btn:hover {
            color: #333 !important;
            background: rgba(0, 0, 0, 0.05) !important;
        }

        .jj-font-family-btn.active {
            background: #fff !important;
            color: #333 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }

        /* 主题卡片网格布局 */
        .jj-theme-group {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
            padding: 8px !important;
            background-color: rgba(0, 0, 0, 0.03) !important;
                    border-radius: 8px !important;
        }

        /* 主题卡片 */
        .jj-theme-card {
            position: relative !important;
            aspect-ratio: 16/9 !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            overflow: hidden !important;
                    display: flex !important;
                    align-items: center !important;
            justify-content: center !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }

        .jj-theme-card.active {
            border: 2px solid #1e88e5 !important;
        }

        .jj-theme-card:hover {
            border-color: #1e88e5 !important;
        }

        /* 主题预览 */
        .jj-theme-preview {
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: column !important;
            gap: 2px !important;
            padding: 6px !important;
            box-sizing: border-box !important;
        }

        /* 预览文本 */
        .jj-theme-preview .preview-text {
            font-size: 13px !important;
            font-weight: 500 !important;
        }

        .jj-theme-preview .preview-name {
            font-size: 11px !important;
            font-weight: normal !important;
            opacity: 0.8 !important;
        }

        /* 默认主题预览 */
        .jj-theme-preview.default {
            background-color: #EEEDED !important;
            color: #333333 !important;
        }

        /* 护眼主题预览 */
        .jj-theme-preview.eye-care {
            background-color: #E6EFD5 !important;
            color: #2C3E50 !important;
        }

        /* 专注主题预览 */
        .jj-theme-preview.focus {
            background-color: #FFFCF4 !important;
            color: #3C3C3C !important;
        }

        /* 夜间主题预览 */
        .jj-theme-preview.dark {
            background-color: #4A4A4D !important;
            color: #FFFFFF !important;
        }

        /* 工具栏标题 */
        .jj-toolbar-title {
            font-size: 14px !important;
            font-weight: 500 !important;
            color: #333 !important;
            margin-bottom: 5px !important;
            text-align: center !important;
        }

        /* 字体大小调整组 */
        .jj-font-size-group {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            padding: 10px !important;
            background-color: rgba(0, 0, 0, 0.03) !important;
            border-radius: 8px !important;
        }

        /* 字体大小按钮组 */
        .jj-font-size-buttons {
            display: flex !important;
            align-items: center !important;
            background: rgba(0, 0, 0, 0.06) !important;
            border-radius: 6px !important;
            padding: 2px !important;
        }

        /* 字体大小按钮 */
        .jj-font-size-btn {
            flex: 1 !important;
            padding: 6px 12px !important;
            border: none !important;
            background: none !important;
                        color: #666 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
            position: relative !important;
        }

        .jj-font-size-btn:hover {
            color: #333 !important;
            background: rgba(0, 0, 0, 0.05) !important;
        }

        .jj-font-size-btn.active {
            background: #fff !important;
            color: #333 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }

        /* 字体大小进度点 */
        .jj-font-size-dots {
            display: flex !important;
            justify-content: center !important;
            gap: 4px !important;
            padding: 4px 0 !important;
        }

        .jj-font-size-dot {
            width: 6px !important;
            height: 6px !important;
            border-radius: 50% !important;
            background-color: rgba(0, 0, 0, 0.1) !important;
            transition: all 0.2s ease !important;
        }

        .jj-font-size-dot.active {
            background-color: #1e88e5 !important;
        }

        /* 主题名称标签 */
        .jj-theme-name {
            position: absolute !important;
            bottom: 8px !important;
            left: 8px !important;
            right: 8px !important;
            font-size: 12px !important;
            font-weight: 500 !important;
            text-align: center !important;
            padding: 4px 8px !important;
            border-radius: 4px !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
        }

        /* 主题样式 */
        /* 默认主题（纸张配色） */
        .theme-default {
            background-color: #E5E5E5 !important;
        }
        .theme-default body {
            background-color: #E5E5E5 !important;
        }
        .theme-default .jj-container {
            background-color: #EEEDED !important;
        }
        .theme-default .jj-novel-content p,
        .theme-default .jj-novel-content div,
        .theme-default .jj-novel-content span,
        .theme-default .jj-novel-content font {
            color: #333333 !important;
        }
        .theme-default .jj-author-note {
            background-color: #E5E5E5 !important;
            border-left-color: #D8D8D8 !important;
            color: #333333 !important;
        }
        .theme-default .jj-nav-link {
            background-color: #E5E5E5 !important;
            border-color: #D8D8D8 !important;
            color: #444444 !important;
        }
        .theme-default .jj-nav-link:hover {
            background-color: #D8D8D8 !important;
            color: #222222 !important;
        }
        .theme-default .jj-novel-header {
            border-bottom-color: #D0D0D0 !important;
        }
        .theme-default .jj-chapter-nav {
            border-top-color: #D0D0D0 !important;
        }

        /* 护眼主题 */
        .theme-eye-care {
            background-color: #D8E5C0 !important;
        }
        .theme-eye-care body {
            background-color: #D8E5C0 !important;
        }
        .theme-eye-care .jj-container {
            background-color: #E6EFD5 !important;
        }
        .theme-eye-care .jj-novel-content p,
        .theme-eye-care .jj-novel-content div,
        .theme-eye-care .jj-novel-content span,
        .theme-eye-care .jj-novel-content font {
            color: #2C3E50 !important;
        }
        .theme-eye-care .jj-author-note {
            background-color: #D8E5C0 !important;
            border-left-color: #C5D4A9 !important;
            color: #2C3E50 !important;
        }
        .theme-eye-care .jj-nav-link {
            background-color: #DCE5C9 !important;
            border-color: #C5D4A9 !important;
            color: #2C3E50 !important;
        }
        .theme-eye-care .jj-nav-link:hover {
            background-color: #C5D4A9 !important;
            color: #1B2E3F !important;
        }
        .theme-eye-care .jj-novel-header {
            border-bottom-color: #B8C7A0 !important;
        }
        .theme-eye-care .jj-chapter-nav {
            border-top-color: #B8C7A0 !important;
        }

        /* 专注主题 */
        .theme-focus {
            background-color: #F5ECD8 !important;
        }
        .theme-focus body {
            background-color: #F5ECD8 !important;
        }
        .theme-focus .jj-container {
            background-color: #FFFCF4 !important;
        }
        .theme-focus .jj-novel-content p,
        .theme-focus .jj-novel-content div,
        .theme-focus .jj-novel-content span,
        .theme-focus .jj-novel-content font {
            color: #3C3C3C !important;
        }
        .theme-focus .jj-author-note {
            background-color: #F5ECD8 !important;
            border-left-color: #E6D5B8 !important;
            color: #3C3C3C !important;
        }
        .theme-focus .jj-nav-link {
            background-color: #FFF7E6 !important;
            border-color: #E6D5B8 !important;
            color: #3C3C3C !important;
        }
        .theme-focus .jj-nav-link:hover {
            background-color: #E6D5B8 !important;
            color: #2C2C2C !important;
        }
        .theme-focus .jj-novel-header {
            border-bottom-color: #D9C8A7 !important;
        }
        .theme-focus .jj-chapter-nav {
            border-top-color: #D9C8A7 !important;
        }

        /* 夜间主题 */
        .theme-dark {
            background-color: #2D2D30 !important;
        }
        .theme-dark body {
            background-color: #2D2D30 !important;
        }
        .theme-dark .jj-container {
            background-color: #4A4A4D !important;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2) !important;
        }
        .theme-dark .jj-novel-content p,
        .theme-dark .jj-novel-content div,
        .theme-dark .jj-novel-content span,
        .theme-dark .jj-novel-content font {
            color: #FFFFFF !important;
        }
        .theme-dark .jj-author-note {
            background-color: #2D2D30 !important;
            border-left-color: rgba(255, 255, 255, 0.1) !important;
            color: #FFFFFF !important;
        }
        .theme-dark .jj-nav-link {
            background-color: #5A5A5D !important;
            border-color: #666666 !important;
            color: #FFFFFF !important;
        }
        .theme-dark .jj-nav-link:hover {
            background-color: #666666 !important;
            color: #FFFFFF !important;
        }
        .theme-dark .jj-novel-title,
        .theme-dark .jj-novel-title a {
            color: #FFFFFF !important;
        }
        .theme-dark .jj-novel-author,
        .theme-dark .jj-novel-author a {
            color: #BBBBBB !important;
        }
        .theme-dark .jj-toolbar {
            background-color: rgba(74, 74, 77, 0.95) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .theme-dark .jj-toolbar-title {
            color: #FFFFFF !important;
        }
        .theme-dark .jj-font-size-btn {
            color: #FFFFFF !important;
        }
        .theme-dark .jj-font-size-btn:hover {
            background: rgba(255, 255, 255, 0.1) !important;
        }
        .theme-dark .jj-font-size-dot {
            background-color: rgba(255, 255, 255, 0.2) !important;
        }
        .theme-dark .jj-font-size-dot.active {
            background-color: #FFFFFF !important;
        }
        .theme-dark .jj-chapter-select {
            background-color: #5A5A5D !important;
            border-color: #666666 !important;
            color: #FFFFFF !important;
        }
        .theme-dark .jj-chapter-select:hover {
            background-color: #666666 !important;
        }
        .theme-dark .jj-novel-header {
            border-bottom-color: rgba(255, 255, 255, 0.1) !important;
        }
        .theme-dark .jj-chapter-nav {
            border-top-color: rgba(255, 255, 255, 0.1) !important;
        }
    `;
    document.head.appendChild(style);

    // 页面加载后执行
    window.addEventListener('load', function() {
        // 首先通过DOM操作直接移除所有收藏相关元素
        function removeElements() {
            // 移除书签图标和收藏按钮
            const elementsToRemove = [
                'div[style*="float:right"][style*="height: 25px"]',
                'img[src*="bookmark.gif"]',
                'span.favorite_novel',
                'span[id*="favorite_"]',
                'div[style*="width: 100%; text-align: center"]:has(span[id*="favorite_"])',
                'div[style*="width: 100%; text-align: center"]:has(span[id="report_action"])',
                'span[id="report_action"]',
                'span[id="yrt3"]',
                'div[id="float_favorite"]',
                'div[id="mongolia_layer"]',
                'div[id="report_box"]',
                'div[id="favoriteshow_2"]',
                'div[id*="favoriteshow_"]',
                'span[id="chapterJurisdiction"]'
            ];
            
            elementsToRemove.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    if (el && el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                });
            });
            
            // 查找并移除整个收藏区域的容器
            document.querySelectorAll('div[style*="width: 100%; text-align: center"]').forEach(div => {
                if (div.textContent.includes('收藏') || 
                    div.textContent.includes('投诉') || 
                    div.textContent.includes('插入书签') || 
                    div.textContent.includes('免费得晋江币')) {
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                }
            });
            
            // 查找包含书签图标的div
            document.querySelectorAll('div[style*="float:right"]').forEach(div => {
                const img = div.querySelector('img[src*="bookmark.gif"]');
                if (img && div.parentNode) {
                    div.parentNode.removeChild(div);
                }
            });
        }

        // 创建返回顶部按钮
        const backToTopBtn = document.createElement('div');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.textContent = '↑';
        backToTopBtn.title = '返回顶部';
        backToTopBtn.onclick = function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        };
        document.body.appendChild(backToTopBtn);
        
        // 控制返回顶部按钮显示/隐藏
        function toggleBackToTop() {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = 'block';
                } else {
                backToTopBtn.style.display = 'none';
            }
        }
        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop(); // 初始化状态
        
        // 创建新的页面结构
        function createNewLayout() {
            // 先移除收藏相关元素
            removeElements();
            
            // 获取必要的内容
            // 1. 小说标题和作者
            let novelTitle = '';
            let novelAuthor = '';
            let authorHref = '';
            let novelHref = '';
            
            // 尝试从不同位置获取标题和作者
            const titleElements = document.querySelectorAll('.noveltitle h1, .noveltitle h2, .readtitle h1, .readtitle h2');
            if (titleElements.length > 0) {
                // 尝试获取标题链接
                const titleLink = titleElements[0].querySelector('a');
                if (titleLink) {
                    novelTitle = titleLink.textContent.trim();
                    novelHref = titleLink.getAttribute('href');
                } else {
                    novelTitle = titleElements[0].textContent.trim();
                }
            }
            
            // 如果标题链接未找到，尝试找到包含novelid的链接
            if (!novelHref) {
                const novelLinks = document.querySelectorAll('a[href*="onebook.php?novelid="]');
                for (let i = 0; i < novelLinks.length; i++) {
                    const link = novelLinks[i];
                    if (link.textContent.includes(novelTitle) || 
                        (link.querySelector('span') && link.querySelector('span').textContent.includes(novelTitle))) {
                        novelHref = link.getAttribute('href');
                        break;
                    }
                }
            }
            
            // 如果仍未找到，尝试从当前URL构造小说主页URL
            if (!novelHref) {
                const currentUrl = window.location.href;
                const match = currentUrl.match(/novelid=(\d+)/);
                if (match && match[1]) {
                    novelHref = `http://www.jjwxc.net/onebook.php?novelid=${match[1]}`;
                }
            }
            
            // 改进的作者提取逻辑
            // 方法1：查找包含"作者："文本的span元素
            const authorSpans = document.querySelectorAll('span');
            for (let i = 0; i < authorSpans.length; i++) {
                const span = authorSpans[i];
                if (span.textContent.includes('作者：')) {
                    const authorLink = span.querySelector('a');
                    if (authorLink) {
                        novelAuthor = authorLink.textContent.trim();
                        authorHref = authorLink.getAttribute('href');
                        break;
                    }
                }
            }
            
            // 方法2：如果方法1失败，查找指向作者页面的链接
            if (!novelAuthor) {
                const authorLinks = document.querySelectorAll('a[href*="oneauthor.php"]');
                if (authorLinks.length > 0) {
                    novelAuthor = authorLinks[0].textContent.trim();
                    authorHref = authorLinks[0].getAttribute('href');
                }
            }
            
            // 方法3：如果前两种方法都失败，回退到原来的方法
            if (!novelAuthor) {
                const authorElements = document.querySelectorAll('.noveltitle a, .readtitle a');
                for (let i = 0; i < authorElements.length; i++) {
                    const text = authorElements[i].textContent.trim();
                    if (text && text.length < 20) {
                        novelAuthor = text;
                        authorHref = authorElements[i].getAttribute('href');
                        break;
                    }
                }
            }
            
            // 2. 章节标题 - 不再需要，已从布局中移除
            
            // 3. 正文内容
            let contentHTML = '';
            const contentElements = document.querySelectorAll('.noveltext, .readtd, .novelbody[style*="grid-column:1"]:not(:has(div#copyrightlist)):not([style*="text-align: center"]), .novelbody[style*="grid-column: 1"]:not(:has(div#copyrightlist)):not([style*="text-align: center"])');
            if (contentElements.length > 0) {
                contentHTML = contentElements[0].innerHTML;
            }
            
            // 4. 导航链接和章节选择器
            const navLinks = [];
            let prevChapterLink = null;
            let nextChapterLink = null;
            let tocLink = null;
            
            document.querySelectorAll('a[href*="onebook.php"]').forEach(link => {
                const text = link.textContent.trim();
                if (text.includes('上一章')) {
                    prevChapterLink = {
                        href: link.getAttribute('href'),
                        text: text
                    };
                } else if (text.includes('下一章')) {
                    nextChapterLink = {
                        href: link.getAttribute('href'),
                        text: text
                    };
                } else if (text.includes('目录') || text.includes('返回目录')) {
                    tocLink = {
                        href: link.getAttribute('href'),
                        text: text
                    };
                    navLinks.push(tocLink);
                }
            });
            
            // 提取章节选择下拉列表
            let chapterSelect = null;
            // 优先查找ID为chapter_list的select元素
            chapterSelect = document.getElementById('chapter_list');
            
            // 如果找不到特定ID的select，尝试查找其他可能的章节选择器
            if (!chapterSelect) {
                document.querySelectorAll('select').forEach(select => {
                    if (select.options && select.options.length > 0) {
                        // 检查是否包含章节名称
                        const hasChapterOptions = Array.from(select.options).some(option => 
                            option.text.includes('第') && option.text.includes('章') || 
                            option.text.includes('序章') || 
                            option.text.includes('楔子') || 
                            option.text.includes('尾声') ||
                            option.text.includes('番外')
                        );
                        
                        if (hasChapterOptions) {
                            chapterSelect = select;
                        }
                    }
                });
            }
            
            // 创建新的布局容器
            const container = document.createElement('div');
            container.className = 'jj-container';
            
            // 创建标题区域
            const headerDiv = document.createElement('div');
            headerDiv.className = 'jj-novel-header';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'jj-novel-title';
            
            if (novelHref) {
                // 如果有标题链接，创建链接元素
                titleDiv.innerHTML = '<a href="' + novelHref + '" target="_blank" style="color: #222; text-decoration: none; transition: color 0.2s ease;">' + novelTitle + '</a>';
                
                // 添加鼠标悬停效果
                const titleLink = titleDiv.querySelector('a');
                if (titleLink) {
                    titleLink.addEventListener('mouseover', function() {
                        this.style.color = '#1e88e5';
                    });
                    titleLink.addEventListener('mouseout', function() {
                        this.style.color = '#222';
                    });
                }
            } else {
                // 没有链接就显示纯文本
                titleDiv.textContent = novelTitle;
            }
            
            headerDiv.appendChild(titleDiv);
            
            if (novelAuthor) {
                const authorDiv = document.createElement('div');
                authorDiv.className = 'jj-novel-author';
                
                if (authorHref) {
                    // 如果有作者链接，创建链接元素
                    authorDiv.innerHTML = '作者：<a href="' + authorHref + '" target="_blank" style="color: #666; text-decoration: none; transition: color 0.2s ease;">' + novelAuthor + '</a>';
                    
                    // 添加鼠标悬停效果
                    const authorLink = authorDiv.querySelector('a');
                    if (authorLink) {
                        authorLink.addEventListener('mouseover', function() {
                            this.style.color = '#1e88e5';
                            this.style.textDecoration = 'underline';
                        });
                        authorLink.addEventListener('mouseout', function() {
                            this.style.color = '#666';
                            this.style.textDecoration = 'none';
                        });
                    }
                } else {
                    // 没有链接就显示纯文本
                    authorDiv.textContent = '作者：' + novelAuthor;
                }
                
                headerDiv.appendChild(authorDiv);
            }
            
            // 创建正文区域
            const contentDiv = document.createElement('div');
            contentDiv.className = 'jj-novel-content';
            
            // 处理正文内容，确保图片显示和作者注解样式
            contentHTML = contentHTML
                .replace(/<div class="note_main">/g, '<div class="note_main">')
                .replace(/<div id="note_danmu_wrapper">/g, '<div id="note_danmu_wrapper">');
            
            // 清理内容中的收藏相关元素
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentHTML;
            
            tempDiv.querySelectorAll('div[style*="width: 100%; text-align: center"]').forEach(div => {
                if (div.textContent.includes('收藏') || 
                    div.textContent.includes('投诉') || 
                    div.textContent.includes('插入书签') || 
                    div.textContent.includes('免费得晋江币')) {
                    div.parentNode.removeChild(div);
                }
            });
            
            tempDiv.querySelectorAll('div[style*="float:right"]').forEach(div => {
                const img = div.querySelector('img[src*="bookmark.gif"]');
                if (img) {
                    div.parentNode.removeChild(div);
                }
            });
            
            contentDiv.innerHTML = tempDiv.innerHTML;
            
            // 创建导航区域
            const navDiv = document.createElement('div');
            navDiv.className = 'jj-chapter-nav';
            
            // 添加上一章按钮
            if (prevChapterLink) {
                const prevLink = document.createElement('a');
                prevLink.href = prevChapterLink.href;
                prevLink.className = 'jj-nav-link';
                prevLink.textContent = prevChapterLink.text;
                navDiv.appendChild(prevLink);
            }
            
            // 添加章节选择下拉列表
            if (chapterSelect) {
                // 为防止原始事件丢失，直接从DOM中移除并重新添加到我们的导航区域
                const originalParent = chapterSelect.parentNode;
                chapterSelect.classList.add('jj-chapter-select');
                navDiv.appendChild(chapterSelect);
                
                // 保险起见，如果原始select没有事件监听器，添加一个
                if (chapterSelect.getAttribute('onchange') === null) {
                    chapterSelect.addEventListener('change', function() {
                        if (this.value) {
                            window.location.href = this.value;
                        }
                    });
                }
            }
            
            // 添加下一章按钮
            if (nextChapterLink) {
                const nextLink = document.createElement('a');
                nextLink.href = nextChapterLink.href;
                nextLink.className = 'jj-nav-link';
                nextLink.textContent = nextChapterLink.text;
                navDiv.appendChild(nextLink);
            }
            
            // 如果有目录按钮但没找到章节选择器，添加目录按钮
            if (tocLink && !chapterSelect) {
                const tocLinkElement = document.createElement('a');
                tocLinkElement.href = tocLink.href;
                tocLinkElement.className = 'jj-nav-link';
                tocLinkElement.textContent = tocLink.text;
                navDiv.appendChild(tocLinkElement);
            }
            
            // 组装页面
            container.appendChild(headerDiv);
            container.appendChild(contentDiv);
            container.appendChild(navDiv);
            
            // 清除原有内容，但要确保保留必要的脚本和样式
            const elementsToHide = document.querySelectorAll('body > *:not(#sitetop):not(style):not(script):not(.back-to-top)');
            elementsToHide.forEach(el => {
                if (el !== container && !el.classList.contains('jj-container')) {
                    el.style.display = 'none';
                }
            });
            
            // 添加新布局
            document.body.appendChild(container);
            
            // 再次移除收藏相关元素，确保完全清除
            removeElements();
            
            // 监听DOM变化，以便在动态添加的元素中也移除收藏相关元素
            const observer = new MutationObserver(function(mutations) {
                removeElements();
            });
            
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

            // 创建工具栏
            createToolbar();
            
            // 初始化主题
            initializeSettings();
        }
        
        // 延迟执行，确保页面内容已加载
        setTimeout(createNewLayout, 500);
    });

    // 字体大小调整函数
    function adjustFontSize(delta) {
        const content = document.querySelector('.jj-novel-content');
        if (!content) return;

        // 获取当前字体大小
        let currentSize = parseInt(localStorage.getItem('jj-font-size')) || 18;
        const newSize = Math.min(Math.max(currentSize + delta * 2, 14), 28);

        // 更新所有可能包含文本的元素的字体大小
        const textElements = content.querySelectorAll('p, div:not(.note_main):not(.note_content):not(#note_danmu_wrapper), span, font');
        textElements.forEach(el => {
            // 跳过作者有话说相关的元素
            if (el.closest('.note_main, .note_content, #note_danmu_wrapper')) {
                return;
            }
            el.style.setProperty('font-size', `${newSize}px`, 'important');
            el.style.setProperty('line-height', '2', 'important');
        });

        // 保存设置
        localStorage.setItem('jj-font-size', newSize);

        // 更新UI状态
        updateFontSizeUI(newSize);
    }

    // 更新字体大小按钮和进度点状态
    function updateFontSizeUI(currentSize) {
        // 更新进度点
        const dots = document.querySelectorAll('.jj-font-size-dot');
        const activeIndex = Math.floor((currentSize - 14) / 2);
        
        dots.forEach((dot, index) => {
            if (index <= activeIndex) {
                dot.classList.add('active');
                } else {
                dot.classList.remove('active');
            }
        });

        // 更新按钮状态
        const decreaseBtn = document.querySelector('.jj-font-size-btn:first-child');
        const increaseBtn = document.querySelector('.jj-font-size-btn:last-child');
        
        if (decreaseBtn) {
            decreaseBtn.disabled = currentSize <= 14;
            decreaseBtn.style.opacity = currentSize <= 14 ? '0.5' : '1';
        }
        
        if (increaseBtn) {
            increaseBtn.disabled = currentSize >= 28;
            increaseBtn.style.opacity = currentSize >= 28 ? '0.5' : '1';
        }
    }

    // 主题切换函数
    function setTheme(theme) {
        // 移除所有主题类
        document.body.classList.remove('theme-default', 'theme-eye-care', 'theme-focus', 'theme-dark');
        
        // 添加新主题类
        document.body.classList.add(`theme-${theme}`);

        // 更新按钮状态
        document.querySelectorAll('.jj-toolbar-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === getThemeName(theme)) {
                btn.classList.add('active');
            }
        });

        // 保存设置
        localStorage.setItem('jj-theme', theme);
    }

    // 获取主题名称
    function getThemeName(theme) {
        const themeMap = {
            'default': '默认',
            'eye-care': '护眼',
            'focus': '专注',
            'dark': '夜间'
        };
        return themeMap[theme] || '默认';
    }

    // 字体切换函数
    function setFontFamily(fontFamily) {
        const content = document.querySelector('.jj-novel-content');
        if (!content) return;

        // 更新所有文本元素的字体
        const textElements = content.querySelectorAll('p, div:not(.note_main):not(.note_content):not(#note_danmu_wrapper), span, font');
        textElements.forEach(el => {
            if (el.closest('.note_main, .note_content, #note_danmu_wrapper')) {
                return;
            }
            el.style.setProperty('font-family', fontFamily, 'important');
        });

        // 更新主题预览的字体
        document.querySelectorAll('.jj-theme-preview, .jj-theme-preview .preview-text, .jj-theme-preview .preview-name').forEach(el => {
            el.style.setProperty('font-family', fontFamily, 'important');
        });

        // 保存设置
        localStorage.setItem('jj-font-family', fontFamily);

        // 更新UI状态
        updateFontFamilyUI(fontFamily);
    }

    // 更新字体选择按钮状态
    function updateFontFamilyUI(currentFont) {
        document.querySelectorAll('.jj-font-family-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.font === currentFont);
        });
    }

    // 初始化设置
    function initializeSettings() {
        // 恢复主题设置
        const savedTheme = localStorage.getItem('jj-theme') || 'default';
        setTheme(savedTheme);

        // 恢复字体大小设置
        const savedFontSize = parseInt(localStorage.getItem('jj-font-size')) || 18;
        
        // 恢复字体设置
        const savedFontFamily = localStorage.getItem('jj-font-family') || '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"';
        
        const content = document.querySelector('.jj-novel-content');
        if (content) {
            const textElements = content.querySelectorAll('p, div:not(.note_main):not(.note_content):not(#note_danmu_wrapper), span, font');
            textElements.forEach(el => {
                if (el.closest('.note_main, .note_content, #note_danmu_wrapper')) {
                    return;
                }
                el.style.setProperty('font-size', `${savedFontSize}px`, 'important');
                el.style.setProperty('line-height', '2', 'important');
                el.style.setProperty('font-family', savedFontFamily, 'important');
            });
        }
        
        // 更新UI状态
        updateFontSizeUI(savedFontSize);
        updateFontFamilyUI(savedFontFamily);
    }

    // 创建工具栏
    function createToolbar() {
        // 创建触发按钮
        const trigger = document.createElement('div');
        trigger.className = 'jj-toolbar-trigger';
        // 使用大小文字
        trigger.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; font-family: PingFang SC;">
            <span style="font-size: 16px; font-weight: 500;">大</span>
            <span style="font-size: 12px; font-weight: 500;">小</span>
        </div>
    `;
        document.body.appendChild(trigger);

        const toolbar = document.createElement('div');
        toolbar.className = 'jj-toolbar';

        // 工具栏标题
        const title = document.createElement('div');
        title.className = 'jj-toolbar-title';
        title.textContent = '字体与主题';
        toolbar.appendChild(title);

        // 字体大小调整组
        const fontSizeGroup = document.createElement('div');
        fontSizeGroup.className = 'jj-font-size-group';

        // 字体大小按钮组
        const fontSizeButtons = document.createElement('div');
        fontSizeButtons.className = 'jj-font-size-buttons';

        // 小号字体按钮
        const decreaseBtn = document.createElement('button');
        decreaseBtn.className = 'jj-font-size-btn';
        decreaseBtn.textContent = '小';
        decreaseBtn.onclick = () => adjustFontSize(-1);

        // 大号字体按钮
        const increaseBtn = document.createElement('button');
        increaseBtn.className = 'jj-font-size-btn';
        increaseBtn.textContent = '大';
        increaseBtn.onclick = () => adjustFontSize(1);

        fontSizeButtons.appendChild(decreaseBtn);
        fontSizeButtons.appendChild(increaseBtn);
        fontSizeGroup.appendChild(fontSizeButtons);

        // 字体大小进度点
        const fontSizeDots = document.createElement('div');
        fontSizeDots.className = 'jj-font-size-dots';

        // 创建8个进度点（14px到28px，每2px一个点）
        for (let i = 0; i < 8; i++) {
            const dot = document.createElement('div');
            dot.className = 'jj-font-size-dot';
            fontSizeDots.appendChild(dot);
        }

        fontSizeGroup.appendChild(fontSizeDots);
        toolbar.appendChild(fontSizeGroup);

        // 字体选择组
        const fontFamilyGroup = document.createElement('div');
        fontFamilyGroup.className = 'jj-font-family-group';

        const fonts = [
            { name: '黑体', value: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"' },
            { name: '宋体', value: '"Songti SC", SimSun, "宋体"' }
        ];

        fonts.forEach(font => {
            const button = document.createElement('button');
            button.className = 'jj-font-family-btn';
            button.textContent = font.name;
            button.dataset.font = font.value;
            
            if (localStorage.getItem('jj-font-family') === font.value) {
                button.classList.add('active');
            }

            button.onclick = () => setFontFamily(font.value);
            fontFamilyGroup.appendChild(button);
        });

        toolbar.appendChild(fontFamilyGroup);

        // 主题选择组
        const themeGroup = document.createElement('div');
        themeGroup.className = 'jj-theme-group';

        const themes = [
            { name: '纸张', value: 'default', previewClass: 'default', bgColor: '#EEEDED', textColor: '#333333' },
            { name: '护眼', value: 'eye-care', previewClass: 'eye-care', bgColor: '#E6EFD5', textColor: '#2C3E50' },
            { name: '专注', value: 'focus', previewClass: 'focus', bgColor: '#FFFCF4', textColor: '#3C3C3C' },
            { name: '夜间', value: 'dark', previewClass: 'dark', bgColor: '#4A4A4D', textColor: '#FFFFFF' }
        ];

        themes.forEach(theme => {
            const card = document.createElement('div');
            card.className = 'jj-theme-card';
            if (localStorage.getItem('jj-theme') === theme.value) {
                card.classList.add('active');
            }

            const preview = document.createElement('div');
            preview.className = `jj-theme-preview ${theme.previewClass}`;
            preview.style.backgroundColor = theme.bgColor;
            preview.style.color = theme.textColor;
            preview.textContent = theme.name;
            card.appendChild(preview);

            card.onclick = () => {
                document.querySelectorAll('.jj-theme-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                setTheme(theme.value);
            };

            themeGroup.appendChild(card);
        });

        toolbar.appendChild(themeGroup);
        document.body.appendChild(toolbar);

        // 添加点击事件
        trigger.addEventListener('click', () => {
            toolbar.classList.toggle('expanded');
            trigger.classList.toggle('expanded');
        });

        // 点击其他区域关闭工具栏
        document.addEventListener('click', (e) => {
            if (!toolbar.contains(e.target) && !trigger.contains(e.target)) {
                toolbar.classList.remove('expanded');
                trigger.classList.remove('expanded');
            }
        });

        // 夜间模式下的样式调整
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('theme-dark')) {
                    trigger.style.backgroundColor = 'rgba(74, 74, 77, 0.95)';
                    trigger.querySelector('svg').style.stroke = '#FFFFFF';
                } else {
                    trigger.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                    trigger.querySelector('svg').style.stroke = '#666666';
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
})();