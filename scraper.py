from time import sleep
from selenium import webdriver
import csv
import pandas
from selenium.webdriver.firefox.options import Options

def worldSection():
    driver = webdriver.Firefox()
    driver.maximize_window()
    # For Vince: Create new def and change link to scrape another category
    driver.get("https://www.bbc.com/news/world")
    sleep(10)

    try:
        # Huwag galawin nakakamatay -- Closes POPUP NA PAMBIHIRA KAYA AYAW PALA MAKUHA DATAAAAA
        driver.find_element_by_xpath('//button[contains(@class, "tp-close tp-active")]').click()
        # Huwag galawin nakakamatay -- Closes POPUP NA PAMBIHIRA KAYA AYAW PALA MAKUHA DATAAAAA
        sleep(3)
        next = driver.find_element_by_xpath('//a[contains(@class, "lx-pagination__btn gs-u-mr+ qa-pagination-next-page lx-pagination__btn--active")]')
        while next:
            newscontainer = driver.find_elements_by_xpath('//li[contains(@class, "lx-stream__post-container")]')
            print(len(newscontainer))
            cur_page = driver.current_url
            for newsdata in newscontainer:
                bodyp=[]
                try:
                    clean = newsdata.find_elements_by_xpath('.//div[contains(@class, "lx-stream-post-body")]')
                    # print('clean found')
                    if clean:
                        # get news title
                        title = newsdata.find_element_by_xpath('.//span[contains(@class, "lx-stream-post__header-text gs-u-align-middle")]').get_attribute('textContent')
                        link = newsdata.find_element_by_xpath('.//a[contains(@class, "qa-heading-link lx-stream-post__header-link")]').get_attribute('href')
                        print(title)
                        for data in clean:
                            paragraph = data.find_elements_by_tag_name('p')
                        # print(paragraph)
                            for body in paragraph:
                                # Removes the Ads
                                # if(body.text != 'ADVERTISEMENT'):
                                #     clean = body.text
                                # else:
                                #     clean = ''
                                # Removes redundant spaces
                                news_paragraph = body.text
                                # final = news_paragraph.strip()
                                print(news_paragraph)
                                # bodyp.append(final)
                            # print(bodyp)
                    print('\n')
                except:
                        print('error cannot find clean')
            driver.find_element_by_xpath(".//div[@class='lx-pagination__controls lx-pagination__controls--right  qa-pagination-right']/a[@rel='next']").click()
    except:
        print(driver.error_handler)
        driver.quit()
