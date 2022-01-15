from time import sleep
from selenium import webdriver

link_list = []
limit = 100
def sportsSection():
    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://www.philstar.com/")
    sleep(3)

    try:
        driver.find_element_by_link_text('SPORTS').click()
        sleep(3)
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        check = driver.find_elements_by_xpath('//*[@class="news_title"]')
        limiter = len(check)
        # Change the limit variable to extract news links that is >= of the set limit
        while (limit > limiter):
            # Scroll to last end of page for infinite scrolling extraction
            driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
            sleep(3)
            list = driver.find_elements_by_xpath('//*[@class="TilesText spec"]')
            limiter = len(list)
            print(len(list))

        # Print and extract news href in list
        for extract in list:
            link_list.append(extract.find_element_by_xpath('.//div[contains(@class, "news_title")]//a').get_attribute('href'))
            print(extract.find_element_by_xpath('.//div[contains(@class, "news_title")]//a').get_attribute('href'))
        sleep(1)

        # Extract news data per specific link
        for news in link_list:
            driver.get(news)
            sleep(2)
            # Extract title
            title = driver.find_element_by_xpath('//*[@class="article__title"]').get_attribute('textContent')
            print(title)

            # Get news paragraph
            try:
                paragraph = driver.find_element_by_xpath('//*[@class="article__writeup"]')
                nstring = paragraph.text
                loc = nstring.find('—')
                loc+=2
                print(nstring[loc:])
            except:
                print('No News Data Detected')
            print('\n')

    except:
        print(driver.error_handler)
