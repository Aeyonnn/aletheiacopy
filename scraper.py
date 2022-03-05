from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import csv

def politicsSection():
    options = Options()
    options.headless = False
    driver = webdriver.Firefox(options=options)

    count = 0
    count1 = 0

    # driver = webdriver.Firefox()
    # driver.maximize_window()
    driver.get("https://www.theonion.com")
    sleep(3)
    result = driver.find_elements_by_xpath('//*[@class="dfwuc8-1 cXXEfi"]')

    LinkData = open('LinkData.csv', 'w', encoding='utf-8-sig')
    linkwriter = csv.writer(LinkData)
    header1 = [['No.', 'link']]
    linkwriter.writerows(header1)

    MBData = open('EMdata.csv', 'w', encoding='utf-8-sig')
    writer = csv.writer(MBData)
    header2 = [['No.', 'headline', 'body', 'date']]
    writer.writerows(header2)

    try:
        # Politics Section
        try:
            driver.find_element_by_link_text('Politics').click()
            sleep(1)
            driver.find_element_by_partial_link_text('News In Brief').click()
            sleep(1)
            next = driver.find_element_by_xpath('.//a[contains(@class, "peggds-2 hwNppf next-button")]')
            while next:
                link = []
                list = driver.find_elements_by_xpath('//*[@class="cw4lnv-0 iTueKC js_post_item"]')
                print(len(list))
                root = driver.current_url
                link.append(root)
                for extract in list:
                    count += 1
                    link.append(extract.find_element_by_xpath('.//a[contains(@class, "sc-1out364-0 hMndXN js_link")]').get_attribute('href'))
                    print(extract.find_element_by_xpath('.//a[contains(@class, "sc-1out364-0 hMndXN js_link")]').get_attribute('href'))
                    url = extract.find_element_by_xpath('.//a[contains(@class, "sc-1out364-0 hMndXN js_link")]').get_attribute('href')
                    linkrow = [[count,url]]
                    linkwriter.writerows(linkrow)
                for news in link[1:]:
                    count1 += 1
                    driver.get(news)
                    sleep(2)
                    title = driver.find_element_by_xpath('//*[@class="sc-1efpnfq-0 bBLibw"]').get_attribute('textContent')
                    date = driver.find_element_by_xpath('//*[@class="sc-1out364-0 hMndXN js_meta-time js_link"]').get_attribute('innerText')
                    print(title)
                    print (date)
                    # Extract news and clean data
                    try:
                        paragraph = driver.find_element_by_xpath('//*[@class="sc-77igqf-0 bOfvBY"]')
                        nstring = paragraph.text
                        loc = nstring.find('—')
                        loc+=1
                        body = nstring[loc:]
                        print(body)
                        datarow = [[count1, title, body, date]]
                        writer.writerows(datarow)

                    except:
                        print('No News Data Detected')

                    print('\n')
                    sleep(2)
                driver.get(link[0])
                sleep(2)
                driver.find_element_by_xpath('.//a[contains(@class, "peggds-2 hwNppf next-button")]').click()

        except:
            print('error1')

    except:
        print('error2')


