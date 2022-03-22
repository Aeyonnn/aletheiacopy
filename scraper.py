from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from utils import get_page_text
import csv

rsslinklist=[]
newslinklist=[]
def rssFeed():
    # options = Options()
    # options.headless = True
    # driver = webdriver.Firefox(options=options)
    count = 0
    
    CNNData =  open('CNNData.csv', 'w', encoding='utf-8-sig')
    writer = csv.writer(CNNData)
    header = [['No.', 'heading', 'body', 'link']]
    writer.writerows(header)

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
                count +=1
                # Get specific news link
                newslinklist.append(extract.find_element_by_xpath('.//a').get_attribute('href'))
                link = extract.find_element_by_xpath('.//a').get_attribute('href')
                print(extract.find_element_by_xpath('.//a').get_attribute('href'))

                # Get specific news title
                newstitle = extract.find_element_by_xpath('.//a').get_attribute('textContent')
                print(newstitle)

                # Get news paragraph
                paragraph = extract.find_element_by_xpath('.//div[@class="itemcontent"]').get_attribute('textContent')
                if paragraph != "":
                    print(paragraph)
                else:
                    print('no data')
                print('\n')
                
                datarow = [[count, newstitle, paragraph, link]]
                writer.writerows(datarow)


    except:
        print(driver.error_handler)

