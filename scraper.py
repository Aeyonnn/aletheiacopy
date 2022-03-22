from time import sleep
from selenium import webdriver
import csv

limit = 100
column_class = 'article'
title_class = 'zn0o0 VwmRm blog-post-category-title-font blog-post-category-title-color blog-post-title-color post-title blog-hover-container-element-color Zk5w2 blog-post-category-title-color blog-post-category-title-font'
link_list = []
def viralnewsSection():
    count = 0
    count2 = 0
    
    PTData = open('PTData.csv', 'w', encoding='utf-8-sig')
    writer = csv.writer(PTData)
    header = [['No.', 'headling', 'Body']]
    writer.writerows(header)
    
    LinkData = open('LinkData.csv', 'w', encoding='utf-8-sig')
    writer2 = csv.writer(LinkData)
    header2 = [['No.', 'Link']]
    writer2.writerows(header2)
    
    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://pinoytrendingnews.net/category/viral-news/")
    sleep(3)

    try:
        check = driver.find_elements_by_xpath(f'//*[@class="{column_class}"]')
        limiter = len(check)
        # Change the limit variable to extract news links that is >= of the set limit
        while (limit > limiter):
            sleep(1)
            news = driver.find_elements_by_xpath(f'//*[@class="{column_class}"]//{column_class}')
            news_count = len(news)
            limiter = news_count
            print(news_count)
            # Load More News Data
            driver.find_element_by_xpath('//*[@class="article"]//div[@id="load-posts"]//a').click()

        for data in news:
            count2 += 1
            link = data.find_element_by_xpath(f'.//*[contains(@class, "title front-view-title")]//a').get_attribute('href')
            link_list.append(link)
            datarow2 = [[count2, link]]
            writer2.writerows(datarow2)

        for specnews in link_list:
            count += 1
            driver.get(specnews)
            sleep(1)

            # Extract title
            title = driver.find_element_by_xpath('//*[@class="article"]//div//h1').get_attribute('textContent')
            print(title)

            # Get news paragraph
            try:
                extract_paragraph = driver.find_element_by_xpath('//*[@class="thecontent clearfix"]')
                d_paragraph = extract_paragraph.text
                loc = d_paragraph.find('Reaction?')
                paragraph = d_paragraph[:loc]
                print(paragraph)
            except:
                print('No News Data Detected')
            print('\n')
            
            datarow = [[count, title, paragraph]]
            writer.writerows(datarow)

    except:
        print(driver.error_handler)
