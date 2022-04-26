from time import sleep
from selenium import webdriver
import csv
import pandas
from selenium.webdriver.firefox.options import Options


def businessSection():
    # options = Options()
    # options.headless = True
    # driver = webdriver.Firefox(options=options)
    count = 0
    count1 = 0

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://mb.com.ph/")
    sleep(3)

    LinkData = open('LinkData.csv', 'w', encoding='utf-8-sig')
    linkwriter = csv.writer(LinkData)
    header1 = [['No.','link']]
    linkwriter.writerows(header1)


    MBData = open('EMdata.csv', 'w', encoding='utf-8-sig')
    writer = csv.writer(MBData)
    header2 = [['No.','headline','body','date']]
    writer.writerows(header2)


    try:
        driver.find_element_by_link_text('Business').click()
        sleep(3)
        next = driver.find_element_by_xpath('.//i[contains(@class, "mb-icon-arrow-right")]')
        while next:
            link = []
            # Extract Highlight News
            highlightlist = driver.find_elements_by_xpath('//h3[@class="title"]')
            print(len(highlightlist))
            root = driver.current_url
            link.append(root)
            for extract in highlightlist:
                count += 1
                link.append(extract.find_element_by_xpath('.//a').get_attribute('href'))
                print(extract.find_element_by_xpath('.//a').get_attribute('href'))
                URL = extract.find_element_by_xpath('.//a').get_attribute('href')
                rows = [[count,URL]]
                linkwriter.writerows(rows)


            # Extract List News
            list = driver.find_elements_by_xpath('//h4[@class="title"]')
            print(len(list))
            for extract in list:
                count += 1
                link.append(extract.find_element_by_xpath('.//a').get_attribute('href'))
                print(extract.find_element_by_xpath('.//a').get_attribute('href'))
                URL = extract.find_element_by_xpath('.//a').get_attribute('href')
                rows = [[count,URL]]
                linkwriter.writerows(rows)

            for news in link[1:]:
                count1 += 1
                driver.get(news)
                sleep(2)
                title = driver.find_element_by_xpath('//h2[@class="title"]').get_attribute('textContent')
                print(title)
                bodyp=[]
                # Extract news and clean data
                try:
                    content = driver.find_elements_by_xpath('//*[@class="article-content"]')
                    date = driver.find_element_by_class_name('published').get_attribute('innerText')
                    for data in content:
                        paragraph = data.find_elements_by_tag_name('p')
                        print (paragraph)
                        for body in paragraph:
                            # Removes the Ads
                            if(body.text != 'ADVERTISEMENT'):
                                clean = body.text
                            else:
                                clean = ''
                            # Removes redundant spaces
                            final = clean.strip()
                            print(final)
                            bodyp.append(final)
                        print (bodyp)
                        rows1 = [[count1, title, bodyp, date]]
                        writer.writerows(rows1)


                except:
                    print('No News Data Detected')

                print('\n')
                sleep(2)


            driver.get(link[0])
            sleep(5)
            driver.get(driver.find_element_by_xpath('.//a[contains(@class, "nextpostslink")]').get_attribute('href'))
            # if count == 1200:
            #     driver.quit()
    except:
        print(driver.error_handler)
