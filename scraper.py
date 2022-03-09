from time import sleep
from selenium import webdriver
from loading_status import loading
limit = 100
column_class = 'ms7aY blog-post-description-font blog-card-background-color blog-card-border-color blog-text-color undefined blog-post-category-border-color blog-post-category-post-container blog-post-category-background-color'
title_class = 'zn0o0 VwmRm blog-post-category-title-font blog-post-category-title-color blog-post-title-color post-title blog-hover-container-element-color Zk5w2 blog-post-category-title-color blog-post-category-title-font'
def columnSection():
    count = 0
    count1 = 0
    
    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://www.bulgaronline.com/column/categories/news")
    sleep(3)
    
    

    try:
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        check = driver.find_elements_by_xpath(f'//*[@class="{column_class}"]')
        limiter = len(check)
        # Change the limit variable to extract news links that is >= of the set limit
        while (limit > limiter):
            # Scroll to last end of page for infinite scrolling extraction
            driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
            sleep(1)
            news = driver.find_elements_by_xpath(f'//*[@class="{column_class}"]')
            news_count = len(news)
            limiter = news_count
            print(news_count)

        for data in news:
            # Extract title
            title = data.find_element_by_xpath('.//span[contains(@class, "blog-post-category-title-font blog-post-category-title-color blog-post-title-color")]').get_attribute('textContent')
            print(title)

            # Get news paragraph
            try:
                paragraph = data.find_element_by_xpath('.//*[contains(@class, "_1hN1O NwZmu _3EPBy")]')
                nstring = paragraph.text
                print(nstring)
            except:
                print('No News Data Detected')

            # Get individual url links
            try:
                link = data.find_element_by_xpath(f'.//h2[contains(@class, "{title_class}")]//a').get_attribute('href')
                print(link)
            except:
                print(data.error_handler)
    except:
        print(driver.error_handler)
