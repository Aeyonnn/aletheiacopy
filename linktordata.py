import csv
from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

with open('LinkData.csv', 'r', encoding='utf-8-sig') as file:
    csv_reader = csv.reader(file)
    for line in csv_reader:
        print(line[1])
        # link_list = list(line[1])
        for row in line:
            row+=2


count = 0

RData = open('RData.csv', 'w', encoding='utf-8-sig')
writer = csv.writer(RData)
header = [['No.', 'headline', 'body','label']]
writer.writerows(header)

options = Options()
options.headless = True
options.add_argument("--disable-notifications")
driver = webdriver.Firefox(options=options)

for open_news in link_list:
    count += 1
    driver.get(open_news)
    sleep(2)
    title = driver.find_element_by_xpath('//h1[@class="post-single__title"]').get_attribute('textContent')
    loc = title.find(':')
    validity_check = title[:loc]
    print(validity_check)

    try:
        news_text_check = driver.find_element_by_xpath('//div[@class="post-single__content entry-content"]//li').get_attribute('innerText')
        loc = news_text_check.find(':')
        loc+=2
        news_text = news_text_check[loc:]

        if validity_check == 'MISSING CONTEXT':
            validity = 'False'
            print(news_text)
        elif validity_check == 'FALSE':
            validity = 'False'
            print(news_text)
        elif validity_check == 'HINDI TOTOO':
            validity = 'False'
            print(news_text)
        elif validity_check == 'KULANG SA KONTEKSTO':
            validity = 'False'
            print(news_text)
        else:
            print('News source error')

        Drows = [[count, title, news_text, validity]]
        writer.writerows(Drows)
    except:
        print('News source error')