from time import sleep
from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options

# op = webdriver.ChromeOptions()
# op.add_argument('headless')
# driver = webdriver.Remote(options=op)

def entertainmentSection():
    options = Options()
    options.headless = True
    driver = webdriver.Firefox(options=options)

    # driver = webdriver.Chrome()
    # driver.maximize_window()
    driver.get("https://empirenews.net/")
    sleep(3)
    result = driver.find_elements_by_xpath('//*[@class="suppaMenu"]')
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
                    content = driver.find_elements_by_xpath('//*[@class="entry-header"]')
                    for data in content:
                        headline = data.find_element_by_class_name('entry-title').get_attribute('innerText')
                        print(headline)
                    content = driver.find_elements_by_xpath('//*[@class="entry-content"]')
                    for data in content:
                        paragraph = data.find_elements_by_tag_name('p')
                        for body in paragraph[2:]:
                            print(body.text)
                        print('\n')
                    sleep(5)
                    driver.find_element_by_partial_link_text(' Older posts').click()
                    sleep(5)
            except:
                print('error1')

        except:
            print(driver.error_handler)


