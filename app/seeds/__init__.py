from flask.cli import AppGroup
from .users import seed_users, undo_users
from .algorithms import seed_algorithms, undo_algorithms
from .algorithm_blocks import seed_algorithm_blocks, undo_algorithm_blocks
from .backtests import seed_backtests, undo_backtests
from .portfolios import seed_portfolios, undo_portfolios
from .portfolio_stocks import seed_portfolio_stocks, undo_portfolio_stocks
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_stocks import seed_watchlist_stocks, undo_watchlist_stocks
from .stocks import seed_stocks, undo_stocks
from .stock_historical_prices import seed_stock_historical_prices, undo_stock_historical_prices
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_algorithms()
        undo_algorithm_blocks()
        undo_backtests()
        undo_portfolios()
        undo_portfolio_stocks()
        undo_watchlists()
        undo_watchlist_stocks()
        undo_stocks()
        undo_stock_historical_prices()
    seed_users()
    seed_algorithms()
    seed_algorithm_blocks()
    seed_backtests()
    seed_portfolios()
    seed_watchlists()
    seed_stocks()
    seed_stock_historical_prices()
    seed_watchlist_stocks()
    seed_portfolio_stocks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_algorithms()
    undo_algorithm_blocks()
    undo_backtests()
    undo_portfolios()
    undo_portfolio_stocks()
    undo_watchlists()
    undo_watchlist_stocks()
    undo_stocks()
    undo_stock_historical_prices()
    # Add other undo functions here
