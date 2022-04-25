import csv
from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import pandas

# op = webdriver.ChromeOptions()
# op.add_argument('headless')
# driver = webdriver.Remote(options=op)

def entertainmentSection():
    count = 0

    ENdata = open('ENdata.csv', 'w', encoding='utf-8-sig')
    writer = csv.writer(ENdata)
    header = [['No.','headline', 'date', 'link']]
    writer.writerows(header)

    Bodydata = open('body.csv', 'w', encoding='utf-8-sig')
    writer2 = csv.writer(Bodydata)
    header2 = [['No.','body']]
    writer2.writerows(header2)

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://empirenews.net/")
    sleep(3)
    biginfo = ''
    result = driver.find_elements_by_xpath('//*[@class="suppaMenu"]')
    counter = 0
    counter2 = 0

    for item in result:
        try:
            # Entertainment Section
            try:
                link = item.find_element_by_link_text('Entertainment').click()
                sleep(5)
                scan = driver.find_element_by_partial_link_text(' Older posts')
                sleep(5)
                print('scan')
                while scan:
                    count += 1
                    print (count)
                    content = driver.find_elements_by_xpath('//*[@class="entry-header"]')
                    for data in content:
                        headline = data.find_element_by_class_name('entry-title').get_attribute('innerText')
                        date = data.find_element_by_class_name('entry-date').get_attribute('innerText')
                        div = data.find_element_by_class_name('entry-title')
                        link = div.find_element_by_css_selector('a').get_attribute('href')
                        print(headline)
                        print(date)
                        print(link)
                        counter += 1
                        rows = [[counter,headline, date, link]]
                        writer.writerows(rows)
                    content = driver.find_elements_by_xpath('//*[@class="entry-content"]')
                    for data in content:
                        paragraph = data.find_elements_by_tag_name('p')
                        for body in paragraph[2:]:
                            info = body.text
                            biginfo += body.text
                        counter2 += 1
                        writer2.writerow([counter2,biginfo])
                        print (biginfo)
                        biginfo = ''

                    sleep(5)
                    driver.find_element_by_partial_link_text(' Older posts').click()
                    sleep(5)

                    if count == 1200:
                        scan = False
                        print ('process stop')
                        driver.quit()
            except:
                print('error1')

        except:
            print(driver.error_handler)


