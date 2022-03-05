from time import sleep
import csv
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

link_list = []
limit = 100
def sportsSection():
    count = 0
    count1 = 0

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://www.philstar.com/")
    sleep(3)
    
    LinkData = open('linkdata.csv', 'w', encoding='utf-8-sig')
    linkwriter = csv.writer(LinkData)
    header1 =  [['No.','Link']]
    linkwriter.writerows(header1)
    
    PSData = open('PSData.csv', 'w', encoding='utf-8-sig')
    writer = csv.writer(PSData)
    header2 = [['No.','Headline','Body']]
    writer.writerows(header2)

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


        # Print and extract news href in list (URL)
        for extract in list:
            count += 1
            link_list.append(extract.find_element_by_xpath('.//div[contains(@class, "news_title")]//a').get_attribute('href'))
            print(extract.find_element_by_xpath('.//div[contains(@class, "news_title")]//a').get_attribute('href'))
            URL = extract.find_element_by_xpath('.//div[contains(@class, "news_title")]//a').get_attribute('href')
            rows = [[count, URL]]
            linkwriter.writerows(rows)
        sleep(1)

        # Extract news data per specific link
        for news in link_list:
            count1 += 1
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
                body = (nstring[loc:])
                print(nstring[loc:])
                datarow = [[count1, title, body]]
                writer.writerows(datarow)
            except:
                print('No News Data Detected')

    except:
        print(driver.error_handler)
