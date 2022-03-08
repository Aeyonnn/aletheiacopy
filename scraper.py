from time import sleep
from selenium import webdriver
from loading_status import loading
limit = 100
column_class = 'ms7aY blog-post-description-font blog-card-background-color blog-card-border-color blog-text-color undefined blog-post-category-border-color blog-post-category-post-container blog-post-category-background-color'

def columnSection():
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
                # loc = nstring.find('—')
                # loc+=2
                # print(nstring[loc:])
                print(nstring)
            except:
                print('No News Data Detected')

            # # Get news paragraph
            # try:
            #     paragraph = driver.find_element_by_xpath('//*[@class="article__writeup"]')
            #     nstring = paragraph.text
            #     loc = nstring.find('—')
            #     loc+=2
            #     print(nstring[loc:])
            # except:
            #     print('No News Data Detected')
            # print('\n')

    except:
        print(driver.error_handler)
