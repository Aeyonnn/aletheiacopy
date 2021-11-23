from time import sleep
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

def technologySection():
    options = Options()
    options.headless = True
    driver = webdriver.Firefox(options=options)

    # driver = webdriver.Firefox()
    # driver.maximize_window()
    driver.get("https://mindanation.com/")
    sleep(2)


    try:
        driver.find_elements_by_xpath('//*[@class="primary-menu"]')
        driver.find_element_by_link_text('Technology').click()
        # Checks the page for more content
        next = driver.find_element_by_xpath('.//a[contains(@class, "pagenavi-next")]')
        # Scrolls to the 'next page' element
        while next:
            sleep(2)
            next = driver.find_element_by_xpath('.//a[contains(@class, "pagenavi-next")]')
            driver.execute_script("arguments[0].scrollIntoView();", next)
            sleep(5)
            link = []
            list = driver.find_elements_by_xpath('//*[@class="post-header"]')
            print(len(list))
            root = driver.current_url
            link.append(root)
            # Extracts link within the list
            for extract in list:
                link.append(extract.find_element_by_xpath('.//h3[contains(@class, "entry-title")]//a').get_attribute('href'))
                print(extract.find_element_by_xpath('.//h3[contains(@class, "entry-title")]//a').get_attribute('href'))
            for news in link[1:]:
                driver.get(news)
                sleep(5)
                title = driver.find_element_by_xpath('.//div[contains(@class, "post-header-bd")]//h1[contains(@class, "entry-title")]').get_attribute('textContent')
                print(title)
                # Extract news and clean data
                try:
                    content = driver.find_elements_by_xpath('//*[@class="post-content-bd"]')
                    for data in content:
                        paragraph = data.find_elements_by_tag_name('p')
                        for body in paragraph:
                            print(body.text)
                        print('\n')
                except:
                    print('No News Data Detected')
            driver.get(link[0])
            sleep(2)
            driver.find_element_by_xpath('.//a[contains(@class, "pagenavi-next")]').click()

    except:
        print(driver.error_handler)

