from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from utils import get_page_text
rsslinklist=[]
newslinklist=[]
def rssFeed():
    # options = Options()
    # options.headless = True
    # driver = webdriver.Firefox(options=options)

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://edition.cnn.com/services/rss/")
    sleep(2)


    try:
        link_table = driver.find_elements_by_xpath('//*[@class="cnnBodyText"]//table//tr//td[@valign]')
        # Extracts CNN RSS Topic List Link and Append to list
        for newstopic in link_table:
            rsslinklist.append(newstopic.find_element_by_xpath('.//a').get_attribute('href'))



        # Opens RSS Topic List and Extracts Specific News Links
        for extracttopicrss in rsslinklist:
            driver.get(extracttopicrss)
            sleep(2)
            newsul = driver.find_elements_by_xpath('//*[@class="regularitem"]')
            # Extracts specific news url
            for extract in newsul:
                newslinklist.append(extract.find_element_by_xpath('.//a').get_attribute('href'))
            for news in newslinklist:
                driver.get(news)
                sleep(2)

                # Get specific news title
                newstitle = driver.find_element_by_xpath('//h1').get_attribute('textContent')
                print(newstitle)

                # Get specific news paragraph

                try:
                    newsp = get_page_text(news)
                    print(newsp)

                except:
                    print('no news data')
                print('')

    except:
        print(driver.error_handler)

