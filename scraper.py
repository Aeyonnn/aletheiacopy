from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options


def businessSection():
    # options = Options()
    # options.headless = True
    # driver = webdriver.Firefox(options=options)

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://mb.com.ph/")
    sleep(3)

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
                link.append(extract.find_element_by_xpath('.//a').get_attribute('href'))
                print(extract.find_element_by_xpath('.//a').get_attribute('href'))

            # Extract List News
            list = driver.find_elements_by_xpath('//h4[@class="title"]')
            print(len(list))
            for extract in list:
                link.append(extract.find_element_by_xpath('.//a').get_attribute('href'))
                print(extract.find_element_by_xpath('.//a').get_attribute('href'))

            for news in link[1:]:
                driver.get(news)
                sleep(2)
                title = driver.find_element_by_xpath('//h2[@class="title"]').get_attribute('textContent')
                print(title)
                # Extract news and clean data
                try:
                    content = driver.find_elements_by_xpath('//*[@class="article-content"]')
                    for data in content:
                        paragraph = data.find_elements_by_tag_name('p')
                        for body in paragraph:
                            # Removes the Ads
                            if(body.text != 'ADVERTISEMENT'):
                                clean = body.text
                            else:
                                clean = ''
                            # Removes redundant spaces
                            final = clean.strip()
                            print(final)
                except:
                    print('No News Data Detected')

                print('\n')
                sleep(2)
            driver.get(link[0])
            sleep(2)
            driver.find_element_by_xpath('.//i[contains(@class, "mb-icon-arrow-right")]').click()
    except:
        print(driver.error_handler)
