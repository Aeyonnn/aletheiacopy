from time import sleep
from selenium import webdriver

limit = 100
title_class = 'archive-article__content'
column_class = 'primary'
link_list = []


def factCheckSection():
    count = 0
    count1 = 0

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://www.rappler.com/section/newsbreak/fact-check/")
    sleep(3)

    try:
        check = driver.find_elements_by_xpath(f'//*[@class="{title_class}"]')
        limiter = 0
        # Change the limit variable to extract news links that is >= of the set limit
        while (limit >= limiter):
            news_title = driver.find_elements_by_xpath(f'//*[@class="{title_class}"]')
            news_count = len(news_title)
            limiter += news_count
            print(limiter)
            load_more = driver.find_element_by_xpath('//div[@class="pagination"]//a').get_attribute('href')
            for data in news_title:
                # Extract title
                link = data.find_element_by_xpath('.//h2//a').get_attribute('href')
                link_list.append(data.find_element_by_xpath('.//h2//a').get_attribute('href'))
                print(link)
            driver.get(load_more)
            sleep(2)

        for open_news in link_list:
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
            except:
                print('News source error')
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
    except:
        print(driver.error_handler)
