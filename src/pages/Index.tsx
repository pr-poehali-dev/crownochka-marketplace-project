import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Platform = 'all' | 'pc' | 'mobile';

interface Service {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  platforms: Platform[];
  image: string;
  category: string;
  badge?: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Прокачка аккаунта',
    price: 1999,
    rating: 4.9,
    reviews: 234,
    platforms: ['pc'],
    image: '/placeholder.svg',
    category: 'Услуги',
    badge: 'Хит'
  },
  {
    id: 2,
    title: 'Буст рейтинга',
    price: 2499,
    rating: 4.8,
    reviews: 189,
    platforms: ['pc', 'mobile'],
    image: '/placeholder.svg',
    category: 'Услуги',
    badge: 'Новое'
  },
  {
    id: 3,
    title: 'Внутриигровая валюта',
    price: 499,
    rating: 5.0,
    reviews: 512,
    platforms: ['pc', 'mobile'],
    image: '/placeholder.svg',
    category: 'Валюта'
  },
  {
    id: 4,
    title: 'Прохождение кампании',
    price: 1499,
    rating: 4.7,
    reviews: 156,
    platforms: ['pc'],
    image: '/placeholder.svg',
    category: 'Услуги'
  },
  {
    id: 5,
    title: 'Редкие скины',
    price: 899,
    rating: 4.9,
    reviews: 423,
    platforms: ['pc', 'mobile'],
    image: '/placeholder.svg',
    category: 'Скины',
    badge: 'Хит'
  },
  {
    id: 6,
    title: 'Турнирный набор',
    price: 3499,
    rating: 4.8,
    reviews: 98,
    platforms: ['pc'],
    image: '/placeholder.svg',
    category: 'Наборы'
  }
];

const Index = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<Service[]>([]);

  const filteredServices = services.filter(
    service => selectedPlatform === 'all' || service.platforms.includes(selectedPlatform)
  );

  const addToCart = (service: Service) => {
    setCart([...cart, service]);
  };

  const removeFromCart = (serviceId: number) => {
    setCart(cart.filter(item => item.id !== serviceId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const platformIcons = {
    pc: 'Monitor',
    mobile: 'Smartphone'
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent neon-glow animate-pulse-glow">
              CROWNOCHKA MARKETPLACE
            </h1>
            <nav className="hidden md:flex gap-6">
              {['catalog', 'about', 'reviews', 'profile'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary neon-glow' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О нас'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'profile' && 'Профиль'}
                </button>
              ))}
            </nav>
            <Button
              onClick={() => setActiveSection('cart')}
              className="bg-primary hover:bg-primary/90 hover-neon relative"
            >
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Корзина
              {cart.length > 0 && (
                <Badge className="ml-2 bg-neon-pink text-white animate-pulse-glow">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {activeSection === 'catalog' && (
        <main className="container mx-auto px-4 py-12">
          <section className="mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange bg-clip-text text-transparent animate-fade-in">
              Игровые услуги премиум качества
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Прокачка, буст, валюта — всё для вашей победы
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <Button
                variant={selectedPlatform === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedPlatform('all')}
                className={selectedPlatform === 'all' ? 'bg-primary hover-neon' : ''}
              >
                Все платформы
              </Button>
              {(['pc', 'mobile'] as Platform[]).map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? 'default' : 'outline'}
                  onClick={() => setSelectedPlatform(platform)}
                  className={selectedPlatform === platform ? 'bg-primary hover-neon' : ''}
                >
                  <Icon name={platformIcons[platform]} className="mr-2" size={18} />
                  {platform === 'pc' && 'PC'}
                  {platform === 'mobile' && 'Mobile'}
                </Button>
              ))}
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <Card
                  key={service.id}
                  className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 animate-fade-in overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {service.badge && (
                      <Badge className="absolute top-4 right-4 bg-neon-orange text-white font-bold animate-pulse-glow">
                        {service.badge}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-yellow-400">
                        <Icon name="Star" size={16} className="fill-current" />
                        <span className="ml-1 text-sm font-medium">{service.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({service.reviews} отзывов)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      {service.platforms.map((platform) => (
                        <Icon
                          key={platform}
                          name={platformIcons[platform]}
                          size={18}
                          className="text-muted-foreground"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-primary neon-glow">
                        {service.price} ₽
                      </span>
                      <Button
                        onClick={() => addToCart(service)}
                        className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple transition-all"
                      >
                        <Icon name="Plus" className="mr-1" size={18} />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeSection === 'about' && (
        <main className="container mx-auto px-4 py-12">
          <section className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              О нас
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              CROWNOCHKA MARKETPLACE — ведущая платформа игровых услуг. Мы предоставляем профессиональный буст,
              прокачку аккаунтов и игровые товары для всех популярных платформ.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'Shield', title: 'Безопасность', desc: 'Гарантия защиты данных' },
                { icon: 'Zap', title: 'Скорость', desc: 'Быстрое выполнение заказов' },
                { icon: 'Award', title: 'Качество', desc: 'Профессиональные игроки' }
              ].map((feature, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Icon name={feature.icon} className="mx-auto mb-4 text-primary" size={48} />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeSection === 'reviews' && (
        <main className="container mx-auto px-4 py-12">
          <section className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-neon-pink to-neon-orange bg-clip-text text-transparent">
              Отзывы клиентов
            </h2>
            <div className="space-y-6">
              {[
                {
                  name: 'Александр',
                  rating: 5,
                  text: 'Отличный сервис! Быстро прокачали аккаунт, всё честно и профессионально.',
                  service: 'Прокачка аккаунта'
                },
                {
                  name: 'Мария',
                  rating: 5,
                  text: 'Заказывала буст рейтинга. Результат превзошёл ожидания! Рекомендую.',
                  service: 'Буст рейтинга'
                },
                {
                  name: 'Дмитрий',
                  rating: 4,
                  text: 'Хорошие цены на валюту. Доставка моментальная, поддержка отзывчивая.',
                  service: 'Внутриигровая валюта'
                }
              ].map((review, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.service}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeSection === 'profile' && (
        <main className="container mx-auto px-4 py-12">
          <section className="max-w-2xl mx-auto animate-fade-in">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                    <Icon name="User" size={48} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Игрок#12345</h2>
                    <Badge className="bg-primary">Премиум</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">gamer@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Заказов выполнено</p>
                    <p className="font-medium">23</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Платформы</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">PC</Badge>
                      <Badge variant="secondary">Mobile</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                    Редактировать профиль
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      )}

      {activeSection === 'cart' && (
        <main className="container mx-auto px-4 py-12">
          <section className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Корзина
            </h2>
            {cart.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <Icon name="ShoppingCart" className="mx-auto mb-4 text-muted-foreground" size={64} />
                  <h3 className="text-2xl font-bold mb-2">Корзина пуста</h3>
                  <p className="text-muted-foreground mb-6">Добавьте услуги из каталога</p>
                  <Button onClick={() => setActiveSection('catalog')} className="bg-primary">
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                          <div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">Итого:</span>
                      <span className="text-3xl font-black text-primary neon-glow">{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-lg py-6">
                      <Icon name="CreditCard" className="mr-2" size={20} />
                      Оформить заказ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </section>
        </main>
      )}

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 CROWNOCHKA MARKETPLACE. Все права защищены.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Icon name="MessageCircle" className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" size={24} />
            <Icon name="Mail" className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" size={24} />
            <Icon name="Phone" className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;