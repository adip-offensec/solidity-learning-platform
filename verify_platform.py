from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Load Solidity Master Platform
    page.goto("http://localhost:3000")
    page.wait_for_timeout(3000)

    # Take screenshot of the main platform
    page.screenshot(path="/home/jules/verification/screenshots/solidity_platform.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
