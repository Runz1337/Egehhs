import random

def generate_user_agent():
    browsers = ['Firefox/115.0', 'Chrome/115.0.0.0', 'Safari/537.36']
    platforms = ['Windows NT 10.0; Win64; x64', 'Macintosh; Intel Mac OS X 10_15_7', 'X11; Ubuntu; Linux x86_64']

    browser = random.choice(browsers)
    platform = random.choice(platforms)

    user_agent = f"Mozilla/5.0 ({platform}) AppleWebKit/537.36 (KHTML, like Gecko) {browser} Safari/537.36"

    return user_agent

def generate_user_agents(count):
    return [generate_user_agent() for _ in range(count)]

def save_user_agents_to_file(user_agents, filename):
    with open(filename, 'w') as file:
        for agent in user_agents:
            file.write(agent + '\n')
if __name__ == "__main__":
    num_agents = 1000000
    user_agents = generate_user_agents(num_agents)
    save_user_agents_to_file(user_agents, 'user_agents.txt')
    print(f"{num_agents} tane user-agent string'i 'user_agents.txt' dosyasına kaydedildi.")
