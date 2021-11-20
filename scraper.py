from time import sleep
from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options

# op = webdriver.ChromeOptions()
# op.add_argument('headless')
# driver = webdriver.Remote(options=op)

def politicsSection():
    # options = Options()
    # options.headless = True
    # driver = webdriver.Firefox(options=options)

    driver = webdriver.Firefox()
    driver.maximize_window()
    driver.get("https://www.theonion.com")
    sleep(3)
    result = driver.find_elements_by_xpath('//*[@class="dfwuc8-1 cXXEfi"]')

    try:
        # Politics Section
        try:
            driver.find_element_by_link_text('Politics').click()
            sleep(2)
            driver.find_element_by_partial_link_text('News In Brief').click()
            sleep(3)

            list = driver.find_elements_by_xpath('//*[@class="cw4lnv-5 aoiLP"]')
            for news in list:
                print(news)
                news.find_element_by_xpath('//*[@class="sc-759qgu-0 iRbzKE cw4lnv-6 pdtMb"]').click()
                sleep(3)
                title = driver.find_element_by_xpath('//*[@class="sc-1efpnfq-0 bBLibw"]').get_attribute('textContent')
                print(title)

                # Extract news and clean data
                paragraph = driver.find_element_by_xpath('//*[@class="sc-77igqf-0 bOfvBY"]')
                nstring = paragraph.text
                loc = nstring.find('—')
                loc+=1
                nstring[loc:]
                print(nstring[loc:])

                # Go back to news list
                driver.back()
                sleep(3)
            # while scan:
            #     content = driver.find_elements_by_xpath('//*[@class="entry-header"]')
            #     for data in content:
            #         headline = data.find_element_by_class_name('entry-title').get_attribute('innerText')
            #         print(headline)
            #     content = driver.find_elements_by_xpath('//*[@class="entry-content"]')
            #     for data in content:
            #         paragraph = data.find_elements_by_tag_name('p')
            #         for body in paragraph[2:]:
            #             print(body.text)
            #         print('\n')
            #     sleep(5)
            #     driver.find_element_by_partial_link_text(' Older posts').click()
            #     sleep(5)
        except:
            print('error1')

    except:
        print('error2')


