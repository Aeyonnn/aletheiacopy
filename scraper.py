from time import sleep
from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options

# op = webdriver.ChromeOptions()
# op.add_argument('headless')
# driver = webdriver.Remote(options=op)
link = []
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
            sleep(1)
            driver.find_element_by_partial_link_text('News In Brief').click()
            sleep(1)
            list = driver.find_elements_by_xpath('//*[@class="cw4lnv-0 iTueKC js_post_item"]')
            print(len(list))
            root = driver.current_url
            link.append(root)
            next = driver.find_element_by_xpath('.//a[contains(@class, "peggds-2 hwNppf next-button")]')
            while next:
                for extract in list:
                    link.append(extract.find_element_by_xpath('.//a[contains(@class, "sc-1out364-0 hMndXN js_link")]').get_attribute('href'))
                    print(extract.find_element_by_xpath('.//a[contains(@class, "sc-1out364-0 hMndXN js_link")]').get_attribute('href'))
                for news in link[1:]:
                    driver.get(news)
                    sleep(2)
                    title = driver.find_element_by_xpath('//*[@class="sc-1efpnfq-0 bBLibw"]').get_attribute('textContent')
                    print(title)
                    print('\n')
                    # Extract news and clean data
                    paragraph = driver.find_element_by_xpath('//*[@class="sc-77igqf-0 bOfvBY"]')
                    nstring = paragraph.text
                    loc = nstring.find('—')
                    loc+=1
                    nstring[loc:]
                    print(nstring[loc:])
                    sleep(2)
                driver.get(link[0])
                sleep(2)
                driver.find_element_by_xpath('.//a[contains(@class, "peggds-2 hwNppf next-button")]').click()

        except:
            print('error1')

    except:
        print('error2')


