#!/bin/bash

# Define colors and styling
GREEN='\033[0;32m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

# Get terminal width
TERM_WIDTH=$(tput cols)

# Function for section separator
function draw_separator() {
  local char=${1:-"━"}
  local separator=""
  
  for ((i=0; i<TERM_WIDTH; i++)); do
    separator="${separator}${char}"
  done
  
  echo -e "\n${CYAN}${separator}${RESET}\n"
}

# Function for styled messages
function step() {
  local message=$1
  echo -e "\n${BLUE}${BOLD}⚡️ $message${RESET}"
}

function success() {
  echo -e "${GREEN}${BOLD}✓ $1${RESET}"
}

function info() {
  echo -e "${CYAN}ℹ️  $1${RESET}"
}

# Show total progress
total_steps=6
current_step=0

function show_progress() {
  current_step=$((current_step + 1))
  echo -e "${MAGENTA}[Step $current_step/$total_steps]${RESET}"
}

# Intro
echo -e "\n${MAGENTA}${BOLD}🚀 FICTOAN REBUILD WIZARD 🧙${RESET}\n"
echo -e "${YELLOW}Let's get your development environment up and running!${RESET}\n"

# Stop any running dev servers
show_progress
step "Stopping any running dev servers..."
pkill -f 'node .*/turbo/bin' || true
success "Cleared any running processes"

# Clean up node_modules and .next cache
show_progress
step "Cleaning up the environment..."
rm -rf packages/fictoan-docs/node_modules packages/fictoan-docs/.next
success "Removed node_modules and .next cache"
draw_separator

# Install dependencies for docs
show_progress
step "Installing dependencies for documentation..."
cd packages/fictoan-docs
yarn install
success "Dependencies installed for fictoan-docs"
cd ../..
draw_separator

# Build fictoan-react
show_progress
step "Building Fictoan components..."
cd packages/fictoan-react
yarn build
success "Fictoan React built successfully!"
cd ../../
draw_separator

# Copy library to docs
show_progress
step "Copying library to documentation..."
node scripts/copy-lib.js
success "Library copied to docs project"
draw_separator

# Start the dev server
show_progress
step "Starting the development server..."
echo -e "\n${MAGENTA}${BOLD}🎉 All done! Starting the dev server now...${RESET}\n"

yarn dev
